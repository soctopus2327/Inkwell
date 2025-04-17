import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { motion } from "framer-motion";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function LandingPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-white to-blue-50'}`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800"
      >
        {darkMode ? (
          <SunIcon className="h-6 w-6 text-yellow-500" />
        ) : (
          <MoonIcon className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Reimagine Research with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Your AI-powered companion for reading, understanding, and writing research papers
          </p>
          <div className="flex flex-col gap-4 items-center">
            <div className="flex gap-4">
              <Button
                onClick={() => navigate("/reader")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
              >
                Reader Mode
              </Button>
              <Button
                onClick={() => navigate("/writer")}
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-3 rounded-full text-lg font-semibold transition-all border-2 border-blue-600 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400"
              >
                Writer Mode
              </Button>
            </div>
            <button
              onClick={() => navigate("/guest")}
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Browse as Guest
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Tinder for Papers */}
            <Card className="p-8 text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold mb-4 dark:text-white">Tinder for Papers</h3>
              <p className="text-gray-600 dark:text-gray-300">Swipe to explore and save papers that match your research interests</p>
            </Card>

            {/* Chat with Paper */}
            <Card className="p-8 text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-4 dark:text-white">Chat with the Paper</h3>
              <p className="text-gray-600 dark:text-gray-300">Ask questions and get instant answers from your research papers</p>
            </Card>

            {/* Research Quizzes */}
            <Card className="p-8 text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold mb-4 dark:text-white">Research Quizzes</h3>
              <p className="text-gray-600 dark:text-gray-300">Build your knowledge with interactive quizzes and memory boosters</p>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
