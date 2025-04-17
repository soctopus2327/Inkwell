import React from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftIcon, BookmarkIcon, ChartBarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const Comment = ({ user, time, content, votes }) => (
  <div className="p-4 bg-white rounded-lg shadow-sm mb-4">
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 rounded-full bg-gray-200" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">{user}</h4>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ArrowUpIcon className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-gray-700">{votes}</span>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <ArrowDownIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{content}</p>
      </div>
    </div>
  </div>
);

const TableOfContents = () => (
  <nav className="space-y-1">
    {['Introduction', 'Experimental Setup', 'Key Results', 'Discussion', 'Conclusion'].map((section) => (
      <a
        key={section}
        href={`#${section.toLowerCase()}`}
        className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-md"
      >
        {section}
      </a>
    ))}
  </nav>
);

export default function PaperReader() {
  const [activeTab, setActiveTab] = React.useState('comments');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Reasoning Models Can Be Effective Without Thinking
          </h1>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <TableOfContents />
          </div>

          <div className="prose max-w-none">
            <h2 id="introduction">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Recent advances in large language models have demonstrated remarkable capabilities
              in reasoning and problem-solving. However, the question remains: do these models
              truly "think" in any meaningful sense? This paper explores the effectiveness of
              reasoning models without explicit thinking mechanisms...
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 border-l border-gray-200 bg-white p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'comments', icon: ChatBubbleLeftIcon, label: 'Comments' },
            { id: 'notes', icon: BookmarkIcon, label: 'My Notes' },
            { id: 'similar', icon: ChartBarIcon, label: 'Similar' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md flex items-center justify-center space-x-1
                ${activeTab === id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'comments' && (
          <div>
            <Comment
              user="Alice Chen"
              time="2 hours ago"
              content="Fascinating perspective on the nature of reasoning in AI systems. The experimental results are particularly compelling."
              votes={12}
            />
            <Comment
              user="Bob Smith"
              time="5 hours ago"
              content="I wonder how this relates to the classical symbolic AI approaches. Would love to see a comparison."
              votes={8}
            />

            <div className="mt-4">
              <textarea
                placeholder="Add a comment..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={3}
              />
              <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                Post Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
