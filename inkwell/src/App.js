import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ReaderDashboard from "./pages/ReaderDashboard";
import WriterDashboard from "./pages/WriterDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/reader" element={<ReaderDashboard />} />
      <Route path="/writer" element={<WriterDashboard />} />
    </Routes>
  );
}
