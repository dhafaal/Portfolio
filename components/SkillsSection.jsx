'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FaHtml5, FaGithub, FaWordpress } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiLaravel, SiKotlin, SiFirebase, SiMysql, SiArduino } from 'react-icons/si';

const skills = [
  { 
    name: 'Next.js', 
    icon: <SiNextdotjs className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'Laravel', 
    icon: <SiLaravel className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'HTML', 
    icon: <FaHtml5 className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'Tailwind CSS', 
    icon: <SiTailwindcss className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'Kotlin', 
    icon: <SiKotlin className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'Firebase', 
    icon: <SiFirebase className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'MySQL', 
    icon: <SiMysql className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'Arduino', 
    icon: <SiArduino className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'GitHub', 
    icon: <FaGithub className="w-12 h-12 sm:w-16 sm:h-16" />
  },
  { 
    name: 'WordPress', 
    icon: <FaWordpress className="w-12 h-12 sm:w-16 sm:h-16" />
  },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  
  // Scroll-based animations for fade out effect (consistent with other sections)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  
  // Entry animations
  const { scrollYProgress: entryProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(entryProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

  return (
    <motion.section 
      ref={sectionRef}
      id="skills"
      style={{ opacity }}
      className="min-h-screen flex flex-col justify-center items-center bg-white px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gray-200 rounded-full filter blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ opacity, scale, y }}
          className="text-center mb-12 px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 flex justify-center"
          >
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 tracking-wider uppercase bg-gray-50 px-4 py-2 rounded-full">
              What I Do
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            <span className="relative inline-block">
              My Skills
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute bottom-2 left-0 h-3 bg-gray-200 -z-10"
              />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Horizontal Scrollable Skills */}
        <div className="relative">
          {/* Gradient overlays for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            style={{ opacity, scale }}
            className="overflow-x-auto scrollbar-hide pb-8"
          >
            <div className="flex gap-6 px-4 min-w-max">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="relative bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:border-gray-300 w-40 sm:w-48">
                    {/* Decorative blur on hover */}
                    <div className="absolute -inset-2 bg-gray-100 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10" />

                    {/* Icon */}
                    <div className="flex flex-col items-center gap-4">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-900 group-hover:text-black transition-colors duration-300"
                      >
                        {skill.icon}
                      </motion.div>

                      {/* Skill Name */}
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 text-center">
                        {skill.name}
                      </h3>
                    </div>

                    {/* Floating accent element */}
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        opacity: [0, 0.1, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.2 
                      }}
                      className="absolute top-4 right-4 w-12 h-12 bg-gray-900 rounded-full blur-2xl pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-6"
          >
            <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Scroll to see more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}