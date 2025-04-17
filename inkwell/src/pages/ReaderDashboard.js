import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default function InkwellReaderUI() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-white to-blue-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="text-2xl font-bold text-blue-900">
          <span className="font-serif">🖋️ INKWELL</span>
        </div>
        <Button variant="outline">Reader - Mode</Button>
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto">
          <Card className="p-4 max-w-4xl mx-auto">
            <CardContent>
              <div className="text-orange-600 italic mb-2">
                The EUROCALL Review, Volume 25, No. 2, September 2017
              </div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2">Research paper</h1>
              <h2 className="text-xl font-semibold text-blue-700 mb-1">
                A look at advanced learners’ use of mobile devices for English language study: Insights from interview data
              </h2>
              <p className="text-gray-700 mb-1">Mariusz Kruk</p>
              <p className="text-gray-600 mb-4">University of Zielona Gora, Poland</p>
              <p className="text-blue-500 mb-6">mkruk@uz.zgora.pl</p>
              <p className="mb-4">
                <strong>Abstract</strong><br/>
                The paper discusses the results of a study which explored advanced learners of English engagement with their mobile devices to develop learning goals... <br/>
                <span className="bg-blue-100 px-1 rounded hover:bg-blue-200 cursor-pointer">gathered data were subjected to qualitative and quantitative analysis.</span>
              </p>
              <div className="flex gap-2 mt-2">
                <Button variant="secondary" size="sm">Simplify</Button>
                <Button variant="secondary" size="sm">Ask Inky</Button>
                <Button variant="secondary" size="sm">Comment</Button>
                <Button variant="secondary" size="sm">Discuss</Button>
              </div>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto mt-6">
            <h3 className="text-xl font-semibold mb-2">Discussion</h3>
            <ScrollArea className="h-48 rounded-md border p-4 bg-white space-y-2">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-blue-50 p-3 rounded-md">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>

        <aside className="w-96 border-l bg-white p-4 flex flex-col gap-4">
          <h4 className="text-lg font-bold">TOOLBAR</h4>
          <Button>Extract / Generate Code</Button>
          <Button>Visualize a Concept</Button>
          <Button>View Research Timeline</Button>

          <div className="mt-8">
            <h4 className="text-lg font-bold mb-2">Chat with Inky</h4>
            <div className="bg-blue-100 p-3 rounded-md mb-2 text-sm">
              Hi! I am Inky!<br />What can I help you with today?
            </div>
            <Textarea placeholder="What do you want to ask?" />
          </div>
        </aside>
      </main>
    </div>
  );
}
