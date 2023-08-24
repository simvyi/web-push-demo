import { vapidKey } from "./env-variables";

export async function subscribe(permission = window.Notification.permission) {
  if (permission !== "granted") return null;

  const registration = await navigator.serviceWorker.ready;
  let subscription = await registration.pushManager.getSubscription();
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      applicationServerKey: vapidKey,
      userVisibleOnly: true,
    });
  }

  return subscription;
}

export async function unsubscribe() {
  const registration = await navigator.serviceWorker.ready;
  return registration.pushManager
    .getSubscription()
    .then((subscription) => subscription?.unsubscribe());
}
