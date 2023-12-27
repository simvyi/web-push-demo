import { type FirebaseOptions, initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
  GetTokenOptions,
} from "firebase/messaging";
import { firebaseConfig, fcmVapidKey } from "./env-variables";
import { saveFCMTokenOnServer } from "./api";

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
onMessage(messaging, (e) => {
  console.log("[In-App] FCM Push recieved", {
    data: e.data,
    notification: e.notification,
  });
});

/**
 * Tries to subscribe to FCM
 * @returns token received from FCM, if unsuccessful it returns an empty string
 */
export async function subscribe(permission = window.Notification.permission) {
  if (permission !== "granted") {
    console.log("Permission to show notifications is not granted");
    return "";
  }

  const registration = await navigator.serviceWorker.getRegistration("/fcm");
  if (!registration) return "";
  const options = {
    vapidKey: fcmVapidKey,
    // use a custom sw, if omitted sw must be named 'firebase-messaging-sw.js'
    serviceWorkerRegistration: registration,
  } satisfies GetTokenOptions;

  return getToken(messaging, options).catch((err) => {
    console.log(err);
    return "";
  });
}

export async function unsubscribe() {
  return deleteToken(messaging).catch((err) => {
    console.log(err);
    return false;
  });
}

export async function enableFCMPush(accessToken: string) {
  return window.Notification.requestPermission().then(async (permission) => {
    if (permission !== "granted") {
      return;
    }

    const subscription = await subscribe(permission);
    if (!subscription) {
      return;
    }

    await saveFCMTokenOnServer(accessToken, subscription);
  });
}
