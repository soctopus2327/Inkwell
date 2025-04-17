import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import PaperCard from '../components/paper/PaperCard';
import Sidebar from '../components/layout/Sidebar';
import { papers } from '../data/samplePapers';

export default function PaperSwipe() {
  const [currentPaperIndex, setCurrentPaperIndex] = useState(0);
  const [savedPapers, setSavedPapers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [smartSkimEnabled, setSmartSkimEnabled] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const filteredPapers = papers.filter(paper => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    return searchTerms.every(term =>
      paper.title.toLowerCase().includes(term) ||
      paper.abstract.toLowerCase().includes(term) ||
      paper.tags.some(tag => tag.toLowerCase().includes(term))
    );
  });

  const currentPaper = filteredPapers[currentPaperIndex];

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setSavedPapers(prev => [...prev, currentPaper]);
    }
    
    if (currentPaperIndex < filteredPapers.length - 1) {
      setCurrentPaperIndex(prev => prev + 1);
    } else {
      // Reset to first paper when we reach the end
      setCurrentPaperIndex(0);
    }
  };

  const handleComment = (paper) => {
    // In a real app, this would open a comment modal or navigate to comments
    console.log('Opening comments for:', paper.title);
  };

  // Sample paper data for reference
  const samplePaper = {
  title: 'Primes is in P',
  authors: ['Dr. John Smith', 'Dr. Jane Doe'],
  affiliation: 'Stanford University',
  abstract: 'This groundbreaking paper presents a polynomial-time algorithm for determining whether a given number is prime, resolving one of the most fundamental questions in computational mathematics.',
  summary: 'We introduce a deterministic algorithm that can identify prime numbers in polynomial time, revolutionizing our understanding of computational complexity theory.',
  tags: ['Mathematics', 'Algorithm']
};

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Search papers by title, abstract, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <div className="flex items-center space-x-4 ml-4">
                <Switch
                  checked={smartSkimEnabled}
                  onChange={setSmartSkimEnabled}
                  className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200"
                >
                  <span className="sr-only">Enable Smart Skim</span>
                  <span
                    className={`${
                      smartSkimEnabled ? 'translate-x-6 bg-indigo-600' : 'translate-x-1 bg-white'
                    } inline-block w-4 h-4 transform rounded-full transition-transform duration-200 ease-in-out`}
                  />
                </Switch>
                <span className="text-sm text-gray-600">Smart Skim</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between">
              {/* Paper Cards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex-1 flex justify-center"
              >
                {currentPaper && (
                  <PaperCard
                    paper={currentPaper}
                    onSwipe={handleSwipe}
                    onComment={handleComment}
                  />
                )}
              </motion.div>

              {/* Saved Papers Sidebar */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-80 ml-8 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Papers</h2>
                <div className="space-y-4">
                  {savedPapers.map((paper, index) => (
                    <div
                      key={`${paper.id}-${index}`}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <h3 className="font-medium text-gray-900 mb-1">{paper.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{paper.authors.join(', ')}</p>
                      <div className="flex flex-wrap gap-2">
                        {paper.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {savedPapers.length === 0 && (
                    <p className="text-gray-500 text-sm">No papers saved yet. Swipe right or click the checkmark to save papers you like!</p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
