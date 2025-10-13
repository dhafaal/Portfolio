// components/SkillsSection.jsx
'use client';

import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML', level: '90%' },
  { name: 'CSS / Tailwind', level: '85%' },
  { name: 'JavaScript', level: '80%' },
  { name: 'React / Next.js', level: '85%' },
  { name: 'Laravel / PHP', level: '75%' },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen bg-gray-50 py-24 px-6 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-gray-900 mb-10"
      >
        Skills
      </motion.h2>

      <div className="w-full max-w-3xl space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-800">{skill.name}</span>
              <span className="text-sm text-gray-500">{skill.level}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-gray-300 h-2.5 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: skill.level }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    );
}
