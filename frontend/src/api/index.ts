import { apiUrl } from "../env-variables";

export async function saveTokenOnServer(
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
    .then(() => console.log("Token has been saved"))
    .catch((e) => {
      console.error((e as Error).message);
    });
}
