/**
 * Note that you can use Workbox to inject the sw script in a build step.
 * That way you may use TypeScript, environment variables and import local packages.
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import {
  getMessaging,
  onBackgroundMessage,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-sw.js";

self.addEventListener("install", (e) => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

// Push Notifications
const app = initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
});

const messaging = getMessaging(app);
onBackgroundMessage(messaging, (e) => {
  console.log("[FCM Service Worker] FCM Push Received.");
  console.log("[FCM Service Worker] Data:", e.data);

  self.registration.showNotification(e.data.title, {
    body: e.data.body,
    icon: "/favicon.png",
    data: {
      url: e.data.url,
    },
  });
});

self.addEventListener("notificationclick", (e) => {
  const url = e.notification.data.url;
  if (!url) return;
  e.waitUntil(openPage(url));
});

async function openPage(relativeUrl) {
  return self.clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then((tabs) => {
      const absoluteUrl = new URL(self.registration.scope).origin + relativeUrl;
      if (tabs.length === 0) {
        return self.clients
          .openWindow(absoluteUrl)
          .then((newTab) => newTab?.focus());
      }

      if (tabs[0].url !== absoluteUrl) {
        return tabs[0].navigate(absoluteUrl).then((tab) => tab.focus());
      }

      return tabs[0].focus();
    });
}
