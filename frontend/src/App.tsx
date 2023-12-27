import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./_Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import EnablePushNotifications from "./EnablePushButton";

import {
  enableGenericNotifications,
  subscribe as genericSubscribe,
} from "./genericPush";

import { enableFCMPush, subscribe as fcmSubscribe } from "./fcmPush";
import {
  deleteFCMTokenOnServer,
  deleteOnServer,
  saveFCMTokenOnServer,
  saveOnServer,
} from "./api";

function App() {
  const getAccessToken = () => "access token";

  // Updating the subsciption on every login
  useEffect(() => {
    // Check if user is logged in
    const accessToken = getAccessToken();
    if (!accessToken) return;

    void (async () => {
      // Check if all service wor
      const registration = await navigator.serviceWorker.getRegistration(
        "/generic"
      );
      if (!registration?.active) return;

      const subscription = await genericSubscribe();
      if (subscription) {
        await saveOnServer(subscription, accessToken);
      }
    })();

    return () => {
      deleteOnServer(accessToken);
    };
  }, []);

  useEffect(() => {
    // Check if user is logged in
    const accessToken = getAccessToken();
    if (!accessToken) return;

    void (async () => {
      const registration = await navigator.serviceWorker.getRegistration(
        "/fcm"
      );

      if (!registration?.active) return;
      const fcmToken = await fcmSubscribe();
      if (fcmToken) await saveFCMTokenOnServer(accessToken, fcmToken);
    })();

    return () => {
      deleteFCMTokenOnServer(accessToken);
    };
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/generic"
            element={
              <EnablePushNotifications
                enableNotifications={enableGenericNotifications}
              />
            }
          />
          <Route
            path="/fcm"
            element={
              <EnablePushNotifications enableNotifications={enableFCMPush} />
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
