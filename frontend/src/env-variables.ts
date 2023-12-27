import { FirebaseOptions } from "firebase/app";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const envVariables = import.meta.env;

export const vapidKey: string = envVariables.VITE_VAPID_KEY ?? "";
export const fcmVapidKey: string = envVariables.VITE_FCM_VAPID_KEY ?? "";

export const apiUrl = "https://localhost:5000";

export const firebaseConfig = {
  apiKey: envVariables.VITE_FCM_API_KEY,
  authDomain: "web-push-demo-a69c1.firebaseapp.com",
  projectId: "web-push-demo-a69c1",
  storageBucket: "web-push-demo-a69c1.appspot.com",
  messagingSenderId: "1095088475858",
  appId: "1:1095088475858:web:a56b9f3a570031297be70b",
} satisfies FirebaseOptions;
