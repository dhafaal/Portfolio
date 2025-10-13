// components/AboutSection.jsx
'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center bg-white px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-gray-900 mb-6"
      >
        About Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
        className="text-gray-600 text-center max-w-2xl leading-relaxed"
      >
        I’m a web developer focused on crafting beautiful and functional user experiences.
        I enjoy blending creativity with clean code, and I’m passionate about building
        interfaces that are not only visually appealing but also performant and accessible.
      </motion.p>
    </section>
  );
}
