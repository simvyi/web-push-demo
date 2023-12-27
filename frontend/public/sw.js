// Activate service worker immediately
self.addEventListener("install", (e) => e.waitUntil(self.skipWaiting()));

// Take control over all service workers registered at this page
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("[Service Worker] Generic Push Received.");
  console.log("[Service Worker]", data);

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
      const absoluteUrl = new URL(self.registration.scope).origin + relativeUrl;
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
