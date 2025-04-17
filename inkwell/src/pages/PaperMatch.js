import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, CheckIcon, ArrowRightIcon, BookmarkIcon } from '@heroicons/react/24/outline';

const SavedPaper = ({ title, authors, timestamp }) => (
  <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
    <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
    <p className="text-sm text-gray-500 mb-2">{authors}</p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{timestamp}</span>
      <button className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
        View Paper
      </button>
    </div>
  </div>
);

export default function PaperMatch() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Welcome Panel */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 bg-white p-6 border-r border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Find Your Next Research Paper with PaperMatch
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Our smart matching algorithm analyzes your research interests and reading history
          to suggest papers you'll love. Start swiping to discover your next breakthrough!
        </p>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
            Get Started
          </button>
          <button className="w-full px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:border-gray-300">
            Sign In
          </button>
        </div>
      </motion.div>

      {/* Swipe Interface */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 p-8 flex items-center justify-center"
      >
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Deep Learning Approaches to Quantum Computing
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              By Dr. Sarah Chen, Dr. Michael Zhang • MIT
            </p>
            <p className="text-sm text-gray-700 mb-4 line-clamp-4">
              This paper explores the intersection of deep learning and quantum computing,
              presenting novel approaches to quantum state preparation and measurement using
              neural networks...
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                cs.DS
              </span>
              <span className="px-3 py-1 text-xs bg-purple-50 text-purple-600 rounded-full">
                cs.CC
              </span>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.button>
            <button className="px-4 py-2 text-sm text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
              View Paper
            </button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600"
            >
              <CheckIcon className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Saved Papers */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 bg-white p-6 border-l border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Saved Papers</h2>
          <BookmarkIcon className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="space-y-4">
          <SavedPaper
            title="Quantum Supremacy Using a Programmable Superconducting Processor"
            authors="John Martinis et al."
            timestamp="2 hours ago"
          />
          <SavedPaper
            title="The Attention Mechanism in Language Models"
            authors="Emily Brown, David Lee"
            timestamp="Yesterday"
          />
          <SavedPaper
            title="A New Approach to Neural Architecture Search"
            authors="Alex Wong et al."
            timestamp="2 days ago"
          />
        </div>
      </motion.div>
    </div>
  );
}
