import { useState } from "react";
import { saveOnServer } from "./api";
import { subscribe } from "./subscriptions";

/**
 * Ask user for permission to show notifications.
 * If permission is granted then subscribe to the push service and save the details on the server
 * @param accessToken Bearer token to identify the logged in user
 */
async function enableNotifications(accessToken: string) {
  // Must be executed directly in the callback function for it to work on iOS/iPadOS
  return window.Notification.requestPermission().then(async (permission) => {
    if (permission !== "granted") {
      return;
    }

    const subscription = await subscribe(permission);
    if (!subscription) {
      return;
    }

    await saveOnServer(subscription, accessToken);
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
