import { useEffect } from "react";
import { subscribe, unsubscribe } from "./subscriptions";
import { deleteOnServer, saveOnServer } from "./api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./_Layout";
import Home from "./pages/Home";
import About from "./pages/About";

function hasNotifyPermission(permission: NotificationPermission | undefined = undefined) {
  return (permission ?? window.Notification.permission) === "granted";
}

async function updateSubscription(accessToken: string) {
  // If notifications are not permitted 
  if (!hasNotifyPermission()) {
    // then unsubscribe from push service
    return unsubscribe().then(() => deleteOnServer(accessToken));
  }

  // Ensure to update subscription on push service
  const subscription = await unsubscribe().then(() => subscribe());

  // if subscription is successfull save the details on server
  return !subscription
    ? deleteOnServer(accessToken)
    : saveOnServer(subscription, accessToken);
}

function App() {
  const getAccessToken = () => "access token";
  useEffect(() => {
    void (async () => {
      // Check if user is logged in
      const accessToken = getAccessToken();
      if (!accessToken) return;

      await updateSubscription(accessToken);
    })();
  }, []);
  
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
