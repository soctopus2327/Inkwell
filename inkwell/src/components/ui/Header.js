import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = ({ mode, onToggleMode }) => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center justify-between px-6 py-4 bg-white shadow-sm"
    >
      <div className="flex items-center space-x-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-indigo-600"
        >
          INKWELL
        </motion.div>
      </div>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 left-3 top-2.5" />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleMode}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          {mode} Mode
        </motion.button>
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
      </div>
    </motion.header>
  );
};

export default Header;
