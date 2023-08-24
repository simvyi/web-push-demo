import express from "express";
import type { Express } from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import webpush from "web-push";
import { SubscriptionManagementService } from "./subscriptions";
import { PushClient } from "./push";
import { clientUrl, vapidDetails } from "./env-variables";
import path from "path";

function createApp() {
  return express()
    .use(cors({ origin: clientUrl }))
    .use(express.json());
}

function runServer(app: Express) {
  const port = 5000;
  const options = {
    key: fs.readFileSync("./ssl/server.key"),
    cert: fs.readFileSync("./ssl/server.crt"),
  };

  https
    .createServer(options, app)
    .listen({ port }, () =>
      console.log(`Running at https://localhost:${port}...`)
    );
}

webpush.setVapidDetails(
  vapidDetails.subject,
  vapidDetails.publicKey,
  vapidDetails.privateKey
);

const app = createApp();
const service = new SubscriptionManagementService();
const pushClient = new PushClient();

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

app.post("/save-subscription", (req, res) => {
  const userId = "simeon";
  const userAgent = req.headers["user-agent"] ?? "";
  service.saveSubscription(userId, userAgent, req.body);

  res.json({ message: "Subscription saved" });
});

app.get("/send-notification", async (req, res) => {
  const subscriptions = service
    .getSubscriptions("simeon")
    .map((e) => e.subscription);

  if (subscriptions.length === 0) {
    res.json({ message: "No push notifications to send" }).status(204);
    return;
  }

  const failedEndpoints = await pushClient.sendPush(subscriptions, {
    title: "Hello World",
    body: "The notification text",
    url: "about",
  });

  if (failedEndpoints.length > 0) {
    res.json({
      message: "Some push notifications failed",
      failed: failedEndpoints,
    });
    return;
  }

  res.json({ message: "All push messages succeeded" });
});

runServer(app);
