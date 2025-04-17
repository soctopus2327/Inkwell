import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  BookOpenIcon,
  CalendarIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', icon: HomeIcon, path: '/discover' },
  { name: 'My Projects', icon: BookOpenIcon, path: '/projects' },
  { name: 'Calendar', icon: CalendarIcon, path: '/calendar' },
  { name: 'Saved Papers', icon: BookmarkIcon, path: '/saved' },
  { name: 'Discussions', icon: ChatBubbleLeftRightIcon, path: '/discussions' },
  { name: 'Settings', icon: Cog6ToothIcon, path: '/settings' }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
      <div className="p-6">
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-indigo-600 mb-8"
          >
            INKWELL
          </motion.div>
        </Link>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
