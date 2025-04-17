import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";

export default function InkwellWriterDashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md">
        <div className="font-bold text-xl text-blue-900 mb-6">🖋️ INKWELL</div>
        <div className="text-sm font-semibold text-gray-700 mb-4">Management</div>
        <nav className="flex flex-col gap-2">
          {[
            "Dashboard",
            "Project",
            "My Task",
            "Calender",
            "Emails",
            "Conversation",
            "Setting",
            "Repost",
          ].map((item) => (
            <Button key={item} variant="ghost" className="justify-start">
              {item}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <Input
            placeholder="Search for Application here"
            className="max-w-md bg-gray-100"
          />
          <div className="flex items-center gap-2">
            <Button variant="secondary">Writer - Mode</Button>
            <Avatar>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-6 grid grid-cols-3 gap-6 overflow-y-auto">
          {/* Project Deadlines */}
          <div className="col-span-2 space-y-4">
            <h3 className="text-lg font-semibold">Project Deadlines</h3>
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-blue-900">
                    {i === 0 && "Literary Overview Completion"}
                    {i === 1 && "Initial Data Collection Phase"}
                    {i === 2 && "Dataset cleaning and documentation"}
                  </p>
                  <p className="text-sm text-gray-500">Design all the screen</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                    {i === 0 ? "80%" : i === 1 ? "85%" : "88%"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {i === 0 ? "2 days left" : i === 1 ? "5 days left" : "8 days left"}
                  </div>
                </div>
              </Card>
            ))}

            {/* Citation Graph Section */}
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">Citation Graph</h4>
                <select className="bg-gray-100 px-2 py-1 rounded text-sm">
                  <option>Paper 1</option>
                  <option>Paper 2</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-64 bg-gray-100 rounded flex items-center justify-center">
                  [Graph Placeholder]
                </div>
                <div className="bg-blue-50 rounded p-3">
                  <p className="text-sm mb-2">Citation Tracker</p>
                  <div className="h-40 bg-white rounded shadow-inner p-4 flex flex-col justify-between">
                    <div className="text-right text-xs">100</div>
                    <div className="h-24 w-6 bg-blue-300 self-end" style={{ height: "55%" }}></div>
                    <div className="text-right text-xs">55</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar calendar and project log */}
          <div className="space-y-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Calender</h4>
              <Calendar mode="single" selected={new Date()} className="rounded-md border" />
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Projects</h4>
              <ScrollArea className="h-40">
                {[
                  "Ella joined team developers",
                  "Jenny joined team HR",
                  "Adam got employee of the month",
                  "Robert joined team design",
                ].map((msg, i) => (
                  <div key={i} className="mb-2 text-sm">
                    <strong>{msg.split(" ")[0][0]}</strong> {msg}
                    <p className="text-xs text-gray-400">April {5 + i}, 2025</p>
                  </div>
                ))}
              </ScrollArea>
              <Button className="w-full mt-3">+ Create New Project</Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
