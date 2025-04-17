import React, { useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { XMarkIcon, CheckIcon, ShareIcon, BookOpenIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const PaperCard = ({ paper, onSwipe, onShare, onComment }) => {
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 0]);

  const handleDragEnd = async (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -100 || velocity < -500) {
      await controls.start({ x: -500, opacity: 0 });
      onSwipe('left');
    } else if (offset > 100 || velocity > 500) {
      await controls.start({ x: 500, opacity: 0 });
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
      dragElastic={1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        handleDragEnd(e, info);
      }}
      animate={controls}
      style={{ x, rotate }}
      initial={{ scale: 0.95, opacity: 0 }}
      className="max-w-xl w-full bg-white rounded-xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing"
    >
      {/* Card Header */}
      <div className="p-6 select-none">
        <div className="flex justify-between items-start mb-4">
          <BookOpenIcon className="w-6 h-6 text-indigo-600" />
          <div className="px-3 py-1 text-sm text-indigo-600 bg-indigo-50 rounded-full">
            Smart Skim
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{paper.title}</h2>
        <p className="text-sm text-gray-600 mb-4">
          {paper.authors.join(', ')} • {paper.affiliation}
        </p>

        {/* Abstract Section */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Abstract</h3>
          <p className="text-sm text-gray-600 line-clamp-3">{paper.abstract}</p>
        </div>

        {/* Summary Section */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Summary</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{paper.summary}</p>
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          {paper.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions */}
      <motion.div 
        className="px-6 py-4 bg-gray-50 flex items-center justify-between"
        style={{ opacity }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSwipe('left')}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200"
        >
          <XMarkIcon className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-full text-gray-500 hover:text-gray-700"
        >
          <ShareIcon className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSwipe('right')}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200"
        >
          <CheckIcon className="w-6 h-6" />
        </motion.button>

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
      </motion.div>
    </motion.div>
  );
};

export default PaperCard;
