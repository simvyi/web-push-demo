/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const envVariables = import.meta.env;

export const vapidKey = envVariables.VITE_VAPID_KEY ?? "";
console.log(vapidKey);
export const apiUrl = "https://localhost:5000";
