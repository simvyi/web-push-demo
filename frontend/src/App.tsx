import { useEffect } from "react";
import { subscribe, unsubscribe } from "./subscriptions";
import { saveTokenOnServer } from "./api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./_Layout";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const getAccessToken = () => "access token";
  useEffect(() => {
    void (async () => {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const subscription = await unsubscribe().then(() => subscribe());
      if (!subscription) return;

      await saveTokenOnServer(subscription, accessToken);
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
