import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ReaderDashboard from "./pages/ReaderDashboard";
import WriterDashboard from "./pages/WriterDashboard";
import PaperSwipe from "./pages/PaperSwipe";
import PaperReader from "./pages/PaperReader";
import PaperMatch from "./pages/PaperMatch";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/reader" element={<ReaderDashboard />} />
      <Route path="/writer" element={<WriterDashboard />} />
      <Route path="/guest" element={<ReaderDashboard />} />
      <Route path="/discover" element={<PaperSwipe />} />
      <Route path="/paper/:id" element={<PaperReader />} />
      <Route path="/match" element={<PaperMatch />} />
    </Routes>
  );
}
