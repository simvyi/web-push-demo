/**
 * @returns true if browser supports web push notifications, otherwise false
 */
function pushIsPossible() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * If web push notifications are supported then register the service worker with a root scope.
 * The service worker is registered as an ES Module script.
 * @param url path to service worker script, either relative or absolute path
 * @returns service worker registration when registration is completed
 */
export async function registerSw(url: string, scope = "/") {
  if (!pushIsPossible) return null;

  return navigator.serviceWorker.register(url, {
    type: "module",
    scope,
  });
}

/**
 * Remove service worker if it exists
 * @returns true if service worker is removed successfully
 */
export async function unregisterSw(url: string) {
  return !("serviceWorker" in navigator)
    ? true
    : navigator.serviceWorker
        .getRegistration(url)
        .then((registration) =>
          !registration ? true : registration.unregister()
        );
}
