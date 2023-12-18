
/**
 * @returns true if browser supports web push notifications, otherwise false
 */
function pushIsPossible() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * If web push notifications are supported then register the service worker with a root scope.
 * The service worker is registered as an ES Module script.
 * @returns service worker registration when registration is completed
 */
export function registerSw() {
  if (!pushIsPossible) return null;

  return navigator.serviceWorker.register("/sw.js", {
    type: "module",
    scope: "/",
  });
}

/**
 * Remove service worker if it exists
 * @returns true if service worker is removed successfully
 */
export async function unregisterSw() {
    return !("serviceWorker" in navigator) 
    ? true 
    : navigator.serviceWorker.ready.then((registration) =>
        registration.unregister()
      );
}
