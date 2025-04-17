import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import PaperCard from '../components/paper/PaperCard';
import TagFilter from '../components/paper/TagFilter';
import SwipeHistory from '../components/paper/SwipeHistory';
import { samplePapers } from '../data/samplePapers';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/layout/Sidebar';

export default function PaperSwipe() {
  const [papers, setPapers] = useState(samplePapers);
  const [currentPaperIndex, setCurrentPaperIndex] = useState(0);
  const [savedPapers, setSavedPapers] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [readingProgress, setReadingProgress] = useState({});
  const [smartSkimEnabled, setSmartSkimEnabled] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [readingStatuses, setReadingStatuses] = useState({});

  // Filter papers based on selected tags, search query, and reading status
  useEffect(() => {
    let filtered = [...samplePapers];

    if (selectedTags.length > 0) {
      filtered = filtered.filter(paper =>
        paper.tags.some(tag => selectedTags.includes(tag.toLowerCase()))
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(query) ||
        paper.abstract.toLowerCase().includes(query) ||
        paper.authors.some(author => author.toLowerCase().includes(query)) ||
        paper.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by reading status if showing saved papers
    if (showSaved) {
      filtered = filtered.filter(paper => 
        readingStatuses[paper.id] === 'completed' || savedPapers.some(saved => saved.id === paper.id)
      );
    }

    setPapers(filtered);
    setCurrentPaperIndex(0);
  }, [selectedTags, searchQuery, showSaved, readingStatuses, savedPapers]);

  const currentPaper = papers[currentPaperIndex];

  const handleSwipe = (direction) => {
    // Add to swipe history
    setSwipeHistory(prev => [
      ...prev,
      { paper: currentPaper, direction, timestamp: new Date() }
    ]);

    // Save paper if swiped right
    if (direction === 'right') {
      setSavedPapers(prev => [...prev, currentPaper]);
    }

    if (currentPaperIndex < papers.length - 1) {
      setCurrentPaperIndex(prev => prev + 1);
    } else {
      // Reset to first paper when we reach the end
      setCurrentPaperIndex(0);
    }
  };

  const handleUndo = () => {
    if (swipeHistory.length === 0) return;

    const lastAction = swipeHistory[swipeHistory.length - 1];
    if (lastAction.direction === 'right') {
      setSavedPapers(prev => prev.filter(p => p.id !== lastAction.paper.id));
    }

    setCurrentPaperIndex(prev => prev - 1);
    setSwipeHistory(prev => prev.slice(0, -1));
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const updateReadingProgress = (paperId, progress) => {
    setReadingProgress(prev => ({
      ...prev,
      [paperId]: progress
    }));

    // Update reading status if progress is complete
    if (progress === 1) {
      setReadingStatuses(prev => ({
        ...prev,
        [paperId]: 'completed'
      }));
    }
  };

  const handleComment = (paper) => {
    // In a real app, this would open a comment modal or navigate to comments
    console.log('Opening comments for:', paper.title);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-64">
        {/* Header */}
        <div className="bg-white shadow-sm dark:bg-gray-800 mb-8">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              {/* Search Bar */}
              <div className="flex-1 max-w-xl relative">
                <input
                  type="text"
                  placeholder="Search papers..."
                  className="w-full px-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <TagFilter
                selectedTags={selectedTags}
                onTagToggle={handleTagToggle}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 flex justify-center">
            {currentPaper ? (
              <PaperCard
                paper={currentPaper}
                onSwipe={handleSwipe}
                readingProgress={readingProgress[currentPaper.id] || 0}
                onReadingProgressChange={(progress) => updateReadingProgress(currentPaper.id, progress)}
                onComment={handleComment}
                onShare={(paper) => {
                  navigator.clipboard.writeText(
                    `Check out this paper: ${paper.title} by ${paper.authors.join(', ')}`
                  );
                  alert('Paper link copied to clipboard!');
                }}
              />
            ) : (
              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                  No more papers
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  You've viewed all available papers.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-8">
            {/* Swipe History */}
            <SwipeHistory
              history={swipeHistory}
              onUndo={handleUndo}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4"
            />

            {/* Saved Papers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Saved Papers ({savedPapers.length})
                </h3>
                <Switch
                  checked={showSaved}
                  onChange={setShowSaved}
                  className={`${showSaved ? 'bg-indigo-600' : 'bg-gray-200'}
                    relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                  <span className="sr-only">Show saved papers only</span>
                  <span
                    className={`${showSaved ? 'translate-x-6' : 'translate-x-1'}
                      inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>
              <div className="space-y-3">
                {savedPapers.map(paper => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {paper.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {paper.authors.join(', ')}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex gap-1">
                        {paper.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full
                        ${readingStatuses[paper.id] === 'completed'
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'}`}
                      >
                        {readingStatuses[paper.id] === 'completed' ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {savedPapers.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                    No papers saved yet. Swipe right or click the checkmark to save papers you like!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
