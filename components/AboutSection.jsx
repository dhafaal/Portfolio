'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const sectionRef = useRef(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Scroll transforms for fade out effect (like Home section)
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
      id="about" 
      style={{ opacity }}
      className="min-h-screen flex flex-col justify-center items-center bg-white px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative overflow-hidden"
    >
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

      <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12 xl:gap-16 relative z-10">
        
        {/* Text Content */}
        <motion.div 
          style={{ y, scale }}
          className="flex-1 space-y-5 text-center lg:text-left order-2 lg:order-1 w-full"
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center lg:justify-start"
          >
            <span className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wider uppercase bg-gray-50 px-4 py-2 rounded-full">
              Get to know me
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
          >
            About <span className="font-bold">Me</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-gray-600 text-justify sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            I'm a web developer focused on crafting beautiful and functional user experiences.
            I enjoy blending creativity with clean code, and I'm passionate about building
            interfaces that are not only visually appealing but also performant and accessible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="pt-2 flex justify-center lg:justify-start"
          >
            <a
              href="https://www.instagram.com/dapaal__/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-full text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                See More
                <svg 
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <motion.div
                className="absolute inset-0 bg-gray-800"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </motion.div>

          {/* Stats or Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap gap-6 sm:gap-8 pt-6 justify-center lg:justify-start"
          >
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">5+</div>
              <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">50+</div>
              <div className="text-xs sm:text-sm text-gray-600">Projects Done</div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">5+</div>
              <div className="text-xs sm:text-sm text-gray-600">Happy Clients</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          style={{ y, scale }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 flex justify-center order-1 lg:order-2 w-full max-w-xs sm:max-w-md lg:max-w-none"
        >
          <div className="relative group w-full">
            {/* Decorative border */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gray-200 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500" />
            
            {/* Image container */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/About.png"
                alt="Dhafa"
                width={500}
                height={500}
                className="block w-full h-auto"
                style={{
                  filter: 'grayscale(100%)',
                  transition: 'filter 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
              />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 border border-gray-200"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 whitespace-nowrap">Available for work</span>
              </div>
            </motion.div>

            {/* Floating decorative element */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-20 h-20 bg-black rounded-full opacity-10 blur-2xl"
            />
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}