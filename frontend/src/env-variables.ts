/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const envVariables = import.meta.env;

export const vapidKey: string = envVariables.VITE_VAPID_KEY ?? "";

export const apiUrl = "https://localhost:5000";
