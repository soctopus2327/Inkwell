import React from 'react';
import { motion } from 'framer-motion';

const tags = [
  { id: 'ai', label: 'AI', color: 'blue' },
  { id: 'math', label: 'Math', color: 'green' },
  { id: 'physics', label: 'Physics', color: 'purple' },
  { id: 'ml', label: 'ML', color: 'red' }
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200',
  green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200',
  red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
};

export default function TagFilter({ selectedTags, onTagToggle }) {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {tags.map(tag => (
        <motion.button
          key={tag.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTagToggle(tag.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${selectedTags.includes(tag.id) 
              ? colorClasses[tag.color]
              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
            }`}
        >
          {tag.label}
        </motion.button>
      ))}
    </div>
  );
}
