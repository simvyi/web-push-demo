function pushIsPossible() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

export function registerSw() {
  if (!pushIsPossible) return;

  void navigator.serviceWorker.register("/sw.js", {
    type: "module",
    scope: "/",
  });
}

export function unregisterSw() {
  if ("serviceWorker" in navigator) {
    void navigator.serviceWorker.ready.then((registration) => {
      void registration.unregister();
    });
  }
}
