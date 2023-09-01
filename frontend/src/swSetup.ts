function pushIsPossible() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

export function registerSw() {
  if (!pushIsPossible) return;

  return navigator.serviceWorker.register("/sw.js", {
    type: "module",
    scope: "/",
  });
}

export function unregisterSw() {
  if ("serviceWorker" in navigator) {
    return navigator.serviceWorker.ready.then((registration) =>
      registration.unregister()
    );
  }
}
