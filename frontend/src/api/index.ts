import { apiUrl } from "../env-variables";

export async function saveOnServer(
  subscription: PushSubscription,
  accessToken: string
) {
  if (!accessToken) return;
  return fetch(`${apiUrl}/save-subscription`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(subscription),
  })
    .then(() => console.log("Subscription has been saved"))
    .catch((e) => {
      console.error((e as Error).message);
    });
}

export async function deleteOnServer(accessToken: string) {
  return fetch(`${apiUrl}/remove-subscription`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(() => console.log("deleted subscription on server"))
    .catch((err) => console.log((err as Error).message));
}

/* ------------------ FCM Logic ------------------ */
export async function saveFCMTokenOnServer(
  accessToken: string,
  fcmToken: string
) {
  if (!accessToken || !fcmToken) return;
  return fetch(`${apiUrl}/save-fcmToken`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ fcmToken }),
  })
    .then(() => console.log("FCM Token has been saved"))
    .catch((e) => {
      console.error((e as Error).message);
    });
}

export async function deleteFCMTokenOnServer(accessToken: string) {
  return fetch(`${apiUrl}/remove-fcmToken`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(() => console.log("deleted token on server"))
    .catch((err) => console.log((err as Error).message));
}
