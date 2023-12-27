import express from "express";
import type { Express } from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import path from "path";
import webpush from "web-push";

import { SubscriptionManager } from "./subscriptions";
import { FCMPushClient, PushClient } from "./push";

import { clientUrl, fcmDetails, vapidDetails } from "./env-variables";
import { TokenManager } from "./fcmTokens";

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

const app = createApp();

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

/* --------------- Generic Push Notifications ----------- */
webpush.setVapidDetails(
  vapidDetails.subject,
  vapidDetails.publicKey,
  vapidDetails.privateKey
);

const manager = new SubscriptionManager();
const pushClient = new PushClient();

app.post("/save-subscription", (req, res) => {
  const userId = "simeon";
  const userAgent = req.headers["user-agent"] ?? "";
  manager.saveSubscription(userId, userAgent, req.body);

  res.json({ message: "Subscription saved" });
});

app.post("/remove-subscription", (req, res) => {
  const userId = "simeon";
  const userAgent = req.headers["user-agent"] ?? "";
  manager.removeSubscription({ userId, userAgent });
  res.json({ message: "Removed successfully" });
});

app.get("/send-notification", async (req, res) => {
  const subscriptions = manager
    .getSubscriptions("simeon")
    .map((e) => e.subscription);

  if (subscriptions.length === 0) {
    res.json({ message: "No push notifications to send" }).status(204);
    return;
  }

  const failedEndpoints = await pushClient.sendPush(subscriptions, {
    title: "Hello from Generic",
    body: "The generic notification text",
    url: "/about",
  });

  if (failedEndpoints.length > 0) {
    res.json({
      message: `${failedEndpoints.length} of ${subscriptions.length} push notifications failed`,
      failed: failedEndpoints,
    });
    return;
  }

  res.json({ message: "All push messages succeeded" });
});

/* -------------- FCM Push Endpoints ------------- */
process.env["GOOGLE_APPLICATION_CREDENTIALS"] = path.join(
  process.cwd(),
  fcmDetails.fcmServiceAccountFileName
);

const fcmPushClient = new FCMPushClient();
const tokenManager = new TokenManager();

app.post("/save-fcmToken", (req, res) => {
  const userId = "simeon";
  const userAgent = req.headers["user-agent"] ?? "";
  tokenManager.saveToken({ userId, userAgent, fcmToken: req.body.fcmToken });

  res.json({ message: "Token saved" });
});

app.post("/remove-fcmToken", (req, res) => {
  const userId = "simeon";
  const userAgent = req.headers["user-agent"] ?? "";
  tokenManager.removeToken({ userId, userAgent });
  res.json({ message: "Removed token successfully" });
});

app.get("/send-fcm-notification", async (req, res) => {
  const tokens = tokenManager.getTokens("simeon").map((e) => e.fcmToken);

  if (tokens.length === 0) {
    res.json({ message: "No fcm push notifications to send" }).status(204);
    return;
  }

  const failed = await fcmPushClient.sendPush(tokens, {
    title: "Hello from FCM",
    body: "The notification text",
    url: "/about",
  });

  if (failed.length > 0) {
    res.json({
      message: `${failed.length} of ${tokens.length} push notifications failed`,
      failed,
    });
    return;
  }

  res.json({ message: "All fcm push messages succeeded" });
});

runServer(app);
