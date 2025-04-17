import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/outline';

export default function SwipeHistory({ history, onUndo, className }) {
  const lastAction = history[history.length - 1];
  const [showFullHistory, setShowFullHistory] = React.useState(false);
  
  const displayHistory = showFullHistory ? history : history.slice(-5);
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Undo Button */}
      {history.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onUndo}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-100 dark:bg-indigo-900 rounded-lg text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
        >
          <ArrowUturnLeftIcon className="w-5 h-5" />
          Undo Last Swipe
        </motion.button>
      )}

      {/* History List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Swipe History</h3>
          {history.length > 5 && (
            <button
              onClick={() => setShowFullHistory(prev => !prev)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              {showFullHistory ? 'Show Less' : 'Show All'}
            </button>
          )}
        </div>
        
        <div className="space-y-2">
          {displayHistory.map((item, index) => (
            <motion.div
              key={`${item.paper.id}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {item.paper.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.paper.authors.join(', ')}
                    </p>
                    <span className="text-xs px-2 py-0.5 rounded-full
                      ${item.direction === 'left'
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      }"
                    >
                      {item.direction === 'left' ? 'Rejected' : 'Accepted'}
                    </span>
                  </div>
                </div>
                {item.direction === 'left' ? (
                  <ArrowLeftIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <ArrowRightIcon className="w-5 h-5 text-green-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* History Stats */}
        {history.length > 0 && (
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
            <span>Total Papers: {history.length}</span>
            <span>
              Accepted: {history.filter(item => item.direction === 'right').length} •
              Rejected: {history.filter(item => item.direction === 'left').length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
