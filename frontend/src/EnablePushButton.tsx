import { useState } from "react";
import { saveOnServer } from "./api";
import { subscribe } from "./genericPush";

function getBrowser() {
  // Get the user-agent string
  const { userAgent } = navigator;

  // Detect Edge
  const edgeAgent = userAgent.includes("Edg");
  if (edgeAgent) return "Edge";

  // Detect Firefox
  const firefoxAgent = userAgent.includes("Firefox");
  if (firefoxAgent) return "Firefox";

  // Detect Opera
  const operaAgent = userAgent.includes("OP");
  if (operaAgent) return "Opera";

  // Detect Chrome
  const chromeAgent = !operaAgent && userAgent.includes("Chrome");
  if (chromeAgent) return "Chrome";

  // Detect Safari
  const safariAgent = !chromeAgent && userAgent.includes("Safari");
  if (safariAgent) return "Safari";

  return "Unknown";
}

type EnablePushNotificationsProps = {
  enableNotifications: (accessToken: string) => Promise<void>;
};

export default function EnablePushNotifications({
  enableNotifications,
}: EnablePushNotificationsProps) {
  const getAccessToken = () => "access token";
  const [permission, setPermission] = useState(window.Notification.permission);

  const statusText = permission === "granted" ? "Enabled" : "Disabled";
  const buttonText = `Push notifications has been ${statusText}`;

  return (
    <div>
      <h1>push notifications on {getBrowser()}</h1>
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
