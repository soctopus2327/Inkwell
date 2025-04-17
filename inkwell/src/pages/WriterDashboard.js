import React from 'react';

export default function WriterDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Writer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for writing tools */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-300">Writing and analysis tools are under development.</p>
        </div>
      </div>
    </div>
  );
}
