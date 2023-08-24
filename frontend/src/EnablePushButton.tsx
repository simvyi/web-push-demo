import { useState } from "react";
import { saveTokenOnServer } from "./api";
import { subscribe } from "./subscriptions";

function enableNotifications(accessToken: string) {
  return window.Notification.requestPermission().then(async (permission) => {
    if (permission !== "granted") {
      return;
    }

    const subscription = await subscribe(permission);
    if (!subscription) {
      return;
    }

    await saveTokenOnServer(subscription, accessToken);
  });
}

export default function EnablePushNotifications() {
  const getAccessToken = () => "access token";
  const [permission, setPermission] = useState(window.Notification.permission);

  const statusText = permission === "granted" ? "Enabled" : "Disabled";
  const buttonText = `Push notifications has been ${statusText}`;

  return (
    <div>
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          await enableNotifications(getAccessToken());
          setPermission(window.Notification.permission);
        }}
        disabled={permission !== "default"}
      >
        {permission === "default" ? "Enable Push Notifications" : buttonText}
      </button>
    </div>
  );
}
