import EnablePushNotifications from "../EnablePushButton";

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

export default function HomePage() {
  return (
    <div>
      <h1>Push Notifications on {getBrowser()}</h1>
      <EnablePushNotifications />
    </div>
  );
}
