self.addEventListener("install", (e) => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("push", (e) => {
  console.log("[Service Worker] Push Received.");
  console.log("[Service Worker]", e.data.json());

  const data = e.data.json();

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/favicon.png",
      data: {
        url: data.url,
      },
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  const url = e.notification.data.url;
  if (!url) return;
  e.waitUntil(openPage(url));
});

function openPage(relativeUrl) {
  return self.clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then((tabs) => {
      const absoluteUrl = self.registration.scope + relativeUrl;
      if (tabs.length === 0) {
        return self.clients
          .openWindow(absoluteUrl)
          .then((newTab) => newTab?.focus());
      }

      if (tabs[0].url !== absoluteUrl) {
        return tabs[0].navigate(absoluteUrl).then((tab) => tab.focus());
      }

      return tabs[0].focus();
    });
}
