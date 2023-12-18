import { vapidKey } from "./env-variables";

/**
 * Subscribes to the push service
 * @param permission notification permission status
 * @returns subscription details if successfully subscribed, otherwise null
 */
export async function subscribe(permission: NotificationPermission | undefined = undefined) {
  permission = permission ?? window.Notification.permission;
  if (permission !== "granted") return null;

  const registration = await navigator.serviceWorker.ready;
  
  let subscription = await registration.pushManager.getSubscription(); // existing subscription
  // if subscription doesn't already exist, try to subscribe to push service
  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      applicationServerKey: vapidKey, // public vapid key to identify the server
      userVisibleOnly: true, // must be 'true' when using FCM
    });
  }

  return subscription;
}

/**
 * Terminate any current push subscription at the push service
 * @returns true if successfully unsubscribed, otherwise it returns false 
 */
export async function unsubscribe() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager
    .getSubscription();
  
  // If no subscription exist the device is also not subscribed
  return !subscription ? true : subscription.unsubscribe().catch(() => false);
}
