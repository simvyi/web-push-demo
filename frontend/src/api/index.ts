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
    .then(() => console.log("deleted token on server"))
    .catch((err) => console.log(err.message));
}
