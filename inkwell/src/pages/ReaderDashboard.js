import React from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftIcon, CodeBracketIcon, ChartBarIcon, ClockIcon, PlusIcon } from '@heroicons/react/24/outline';
import Header from '../components/ui/Header';

const InlineButton = ({ icon: Icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="inline-flex items-center px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100"
  >
    <Icon className="w-4 h-4 mr-1" />
    {label}
  </motion.button>
);

const Toolbar = () => (
  <div className="w-64 p-4 bg-white rounded-lg shadow-sm">
    <h2 className="mb-4 text-lg font-semibold">TOOLBAR</h2>
    <div className="space-y-3">
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        <CodeBracketIcon className="inline w-5 h-5 mr-2" />
        Extract / Generate Code
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        <ChartBarIcon className="inline w-5 h-5 mr-2" />
        Visualize a Concept
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        <ClockIcon className="inline w-5 h-5 mr-2" />
        View Research Timeline
      </motion.button>
    </div>

    <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
      <h3 className="mb-3 text-sm font-semibold text-indigo-900">Chat with Inky</h3>
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center">
          🦉
        </div>
        <div className="flex-1 p-3 bg-white rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Hi! I am Inky! What can I help you with today?</p>
        </div>
      </div>
    </div>
  </div>
);

export default function ReaderDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header mode="Reader" onToggleMode={() => {}} />
      
      <div className="flex gap-6 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 space-y-6"
        >
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              A look at advanced learners' use of mobile devices for English language study: Insights from interview data
            </h1>
            <div className="text-sm text-gray-500 mb-4">
              By Dr. Sarah Johnson, PhD • Department of Applied Linguistics, Stanford University
            </div>
            <div className="text-red-600 italic mb-6">
              Journal of Computer Assisted Learning • April 2025
            </div>
            
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Abstract</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This study investigates how advanced English language learners utilize mobile devices
                <span className="relative inline-block group">
                  {" for autonomous learning outside the classroom. "}
                  <span className="absolute -top-1 left-full ml-2 flex space-x-1">
                    <InlineButton icon={ChatBubbleLeftIcon} label="Ask Inky" />
                    <InlineButton icon={ChatBubbleLeftIcon} label="Comment" />
                  </span>
                </span>
                Through semi-structured interviews with 25 participants, we explored their preferences,
                strategies, and challenges in mobile-assisted language learning.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Discussion</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700"
              >
                <PlusIcon className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <div className="font-medium">Alex Chen</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  Interesting findings about mobile device usage patterns. I wonder if these results
                  would be different for intermediate learners?
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <div className="font-medium">Maria Garcia</div>
                    <div className="text-xs text-gray-500">5 hours ago</div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">
                  The methodology seems robust. Would love to see a follow-up study with a larger
                  sample size across different cultural contexts.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <Toolbar />
      </div>
    </div>
  );
}
