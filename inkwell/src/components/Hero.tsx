'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-2rem)] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-primary-200/30 dark:bg-primary-900/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-40 w-96 h-96 rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-12 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 inline-block"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100/80 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-sm font-medium backdrop-blur-sm border border-primary-200/50 dark:border-primary-800/50">
              Powered by AI 🚀
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight"
          >
            Reimagine Research
            <span className="bg-gradient-to-r from-primary-500 to-blue-500 bg-clip-text text-transparent block mt-2">
              with AI
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transform how you read, understand, and write research papers with our AI-powered platform
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/early-access"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-primary hover:opacity-90 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Get Early Access
              <motion.span
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                initial={false}
              >
                →
              </motion.span>
            </Link>
            <Link
              href="#learn-more"
              className="inline-flex items-center px-8 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 text-gray-600 dark:text-gray-300 font-semibold text-lg transition-all duration-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 backdrop-blur-sm"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 