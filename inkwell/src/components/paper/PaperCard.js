import React, { useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import {
  XMarkIcon,
  CheckIcon,
  ShareIcon,
  BookOpenIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../../contexts/ThemeContext';

const PaperCard = ({ paper, onSwipe, onShare, onComment, readingProgress = 0, onReadingProgressChange }) => {
  const [isSmartSkimEnabled, setIsSmartSkimEnabled] = useState(false);
  const [readingStatus, setReadingStatus] = useState('unread'); // unread, reading, completed
  const { isDark, toggleTheme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 0, 100], [-10, 0, 10]);
  const opacity = useTransform(x, [-100, -50, 0, 50, 100], [0.5, 1, 1, 1, 0.5]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (event, info) => {
    setIsDragging(false);
    const offset = info.offset.x;

    if (offset < -100) {
      await controls.start({ x: -200, opacity: 0 });
      onSwipe('left');
    } else if (offset > 100) {
      await controls.start({ x: 200, opacity: 0 });
      onSwipe('right');
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(paper);
    } else {
      navigator.clipboard.writeText(
        `Check out this paper: ${paper.title} by ${paper.authors.join(', ')}`
      );
      alert('Paper link copied to clipboard!');
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, rotate, opacity }}
      className="max-w-xl w-full bg-white rounded-xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div className="p-6 select-none transition-colors dark:bg-gray-900">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <BookOpenIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <button
              onClick={() => setIsSmartSkimEnabled(prev => !prev)}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm
                ${isSmartSkimEnabled
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
            >
              <EyeIcon className="w-4 h-4" />
              Smart Skim
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? (
              <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Reading Progress and Status */}
        <div className="mb-4 space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Reading Status</span>
              <select
                value={readingStatus}
                onChange={(e) => {
                  setReadingStatus(e.target.value);
                  if (e.target.value === 'completed') {
                    onReadingProgressChange && onReadingProgressChange(1);
                  }
                }}
                className="text-sm bg-gray-100 dark:bg-gray-800 border-none rounded-md py-1 px-2 text-gray-600 dark:text-gray-300"
              >
                <option value="unread">Unread</option>
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(readingProgress * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${readingStatus === 'completed' 
                ? 'bg-green-600 dark:bg-green-500' 
                : 'bg-indigo-600 dark:bg-indigo-500'}`}
              style={{ width: `${readingProgress * 100}%` }}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{paper.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {paper.authors.join(', ')} • {paper.affiliation}
        </p>

        {/* Abstract Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {isSmartSkimEnabled ? 'Smart Summary' : 'Abstract'}
            </h3>
            <button
              onClick={() => setIsSmartSkimEnabled(prev => !prev)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs
                ${isSmartSkimEnabled
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
            >
              <EyeIcon className="w-3 h-3" />
              {isSmartSkimEnabled ? 'View Full' : 'Smart Skim'}
            </button>
          </div>
          {isSmartSkimEnabled ? (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">{paper.summary}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">Key Points:</span>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {paper.keyPoints?.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  )) || [
                    'Novel approach to problem solving',
                    'Significant performance improvements',
                    'Practical applications discussed'
                  ].map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{paper.abstract}</p>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          {paper.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onComment && onComment(paper)}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            {paper.comments} comments
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ShareIcon className="w-5 h-5" />
            Share
          </button>
        </div>
      </div>

      {/* Card Actions */}
      <div className="flex justify-between p-4 bg-gray-50 dark:bg-gray-800">
        <button
          onClick={() => onSwipe('left')}
          className="p-3 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <button
          onClick={() => onSwipe('right')}
          className="p-3 text-green-500 bg-green-50 dark:bg-green-900/20 rounded-full hover:bg-green-100 dark:hover:bg-green-900/40"
        >
          <CheckIcon className="w-6 h-6" />
        </button>

        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleShare}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700"
          >
            <ShareIcon className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => onComment && onComment(paper)}
            className="p-2 rounded-full text-gray-500 hover:text-gray-700"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaperCard;
