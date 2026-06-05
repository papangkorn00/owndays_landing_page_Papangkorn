import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { usePageTracking } from "@/hooks/usePageTracking";

function PageTracker() {
  usePageTracking();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
