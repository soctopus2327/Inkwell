import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-12">Welcome to Inkwell</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Enter Reader Mode</h2>
          <Button onClick={() => navigate("/reader")}>Enter</Button>
        </Card>
        <Card className="p-6 flex flex-col items-center text-center shadow-xl hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">Enter Writer Mode</h2>
          <Button onClick={() => navigate("/writer")}>Enter</Button>
        </Card>
      </div>
      <p className="text-sm text-gray-600 underline cursor-pointer hover:text-blue-800">
        Browse as Guest
      </p>
    </div>
  );
}
