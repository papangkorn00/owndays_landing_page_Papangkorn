import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { recordPageView } from "@/services/api";

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    let sessionId = sessionStorage.getItem("tracking_session_id");
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem("tracking_session_id", sessionId);
    }

    recordPageView(location.pathname, sessionId);

  }, [location.pathname]);
}
