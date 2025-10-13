// components/HomeSection.jsx
'use client';

import { motion } from 'framer-motion';

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-white to-gray-50 px-6"
    >
      {/* Hero Text */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4"
      >
        Hello, I’m <span className="text-gray-950 italic">Dhafa</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg sm:text-xl text-gray-600 max-w-2xl"
      >
        A passionate <span className="font-semibold text-gray-800">Frontend Developer</span> who loves building
        smooth, interactive, and elegant web experiences.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex flex-wrap gap-4 mt-8"
      >
        <a
          href="#projects"
          className="px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-gray-300 rounded-full text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
        >
          Contact Me
        </a>
      </motion.div>

      {/* Subtle Floating Icon */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="mt-12 text-gray-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
