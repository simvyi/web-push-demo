import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSw } from "./swSetup";
// import { unregisterSW } from "./swSetup.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
registerSw("/fcm-sw.js", "/fcm");
// eslint-disable-next-line @typescript-eslint/no-floating-promises
registerSw("/sw.js", "/generic");

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// unregisterSW();
