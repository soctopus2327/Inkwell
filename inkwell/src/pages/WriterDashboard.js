import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, CalendarIcon, EnvelopeIcon, ChatBubbleLeftIcon,
  Cog6ToothIcon, DocumentDuplicateIcon, PlusIcon, ClockIcon
} from '@heroicons/react/24/outline';
import Header from '../components/ui/Header';

const NavigationItem = ({ icon: Icon, label, active }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    className={`flex items-center w-full p-3 rounded-lg ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
  >
    <Icon className="w-5 h-5 mr-3" />
    <span className="font-medium">{label}</span>
  </motion.button>
);

const ProjectDeadline = ({ name, progress, daysLeft, status }) => (
  <div className="p-4 bg-white rounded-lg shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{daysLeft} days left</p>
      </div>
      <span className={`px-2 py-1 text-xs font-medium rounded ${status === 'On Track' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {status}
      </span>
    </div>
    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-indigo-600 rounded-full" 
        style={{ width: `${progress}%` }}
      />
    </div>
    <div className="mt-2 text-right text-sm text-gray-600">{progress}% Complete</div>
  </div>
);

const RecentActivity = ({ user, action, time }) => (
  <div className="flex items-center space-x-3 py-2">
    <div className="w-8 h-8 rounded-full bg-gray-200" />
    <div className="flex-1">
      <p className="text-sm">
        <span className="font-medium">{user}</span> {action}
      </p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

export default function WriterDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Navigation */}
      <div className="w-64 bg-white p-4 border-r border-gray-200">
        <div className="space-y-1">
          <NavigationItem icon={ChartBarIcon} label="Dashboard" active />
          <NavigationItem icon={DocumentDuplicateIcon} label="Projects" />
          <NavigationItem icon={ClockIcon} label="My Tasks" />
          <NavigationItem icon={CalendarIcon} label="Calendar" />
          <NavigationItem icon={EnvelopeIcon} label="Emails" />
          <NavigationItem icon={ChatBubbleLeftIcon} label="Conversation" />
          <NavigationItem icon={Cog6ToothIcon} label="Settings" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Header mode="Writer" onToggleMode={() => {}} />

        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Project Deadlines */}
          <div className="col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Project Deadlines</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New Project
              </motion.button>
            </div>
            <div className="space-y-4">
              <ProjectDeadline 
                name="Research Paper: Mobile Learning" 
                progress={75} 
                daysLeft={5}
                status="On Track"
              />
              <ProjectDeadline 
                name="Literature Review: AI in Education" 
                progress={45} 
                daysLeft={12}
                status="At Risk"
              />
            </div>

            {/* Citation Graph */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Citation Graph</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm h-64 flex items-center justify-center">
                <p className="text-gray-500">Citation visualization coming soon</p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Calendar Widget */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">April 2025</h3>
              <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-center text-sm text-gray-500 py-1">{day}</div>
                ))}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`text-center py-1 text-sm rounded-full
                      ${i === 15 ? 'bg-indigo-600 text-white' : ''}
                      ${i === 20 ? 'bg-indigo-100 text-indigo-600' : ''}
                    `}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-3">
                <RecentActivity 
                  user="You"
                  action="updated Research Paper draft"
                  time="2 hours ago"
                />
                <RecentActivity 
                  user="Dr. Johnson"
                  action="commented on your draft"
                  time="5 hours ago"
                />
                <RecentActivity 
                  user="Team"
                  action="scheduled a review meeting"
                  time="1 day ago"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
