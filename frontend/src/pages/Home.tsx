import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("fcm")}>FCM Web Push</button>
      <button onClick={() => navigate("generic")}>Generic Web Push</button>
    </div>
  );
}
