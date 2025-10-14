'use client';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaHtml5, FaGithub, FaWordpress, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs, SiLaravel, SiKotlin, SiFirebase, SiMysql, SiArduino, SiPhp } from 'react-icons/si';

const skills = [
  { 
    name: 'Next.js',
    category: 'Frontend',
    level: 'Advanced',
    description: 'React framework for production',
    icon: <SiNextdotjs className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'React',
    category: 'Frontend',
    level: 'Advanced',
    description: 'JavaScript library for UI',
    icon: <FaReact className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'Laravel',
    category: 'Backend',
    level: 'Advanced',
    description: 'PHP web framework',
    icon: <SiLaravel className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'HTML',
    category: 'Frontend',
    level: 'Expert',
    description: 'Markup language',
    icon: <FaHtml5 className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'CSS',
    category: 'Frontend',
    level: 'Expert',
    description: 'Styling language',
    icon: <FaCss3Alt className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'JavaScript',
    category: 'Frontend',
    level: 'Advanced',
    description: 'Programming language',
    icon: <FaJs className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 'Advanced',
    description: 'Utility-first CSS framework',
    icon: <SiTailwindcss className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'PHP',
    category: 'Backend',
    level: 'Advanced',
    description: 'Server-side scripting',
    icon: <SiPhp className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'Kotlin',
    category: 'Mobile',
    level: 'Intermediate',
    description: 'Android development',
    icon: <SiKotlin className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'Firebase',
    category: 'Backend',
    level: 'Intermediate',
    description: 'Backend as a Service',
    icon: <SiFirebase className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'MySQL',
    category: 'Database',
    level: 'Advanced',
    description: 'Relational database',
    icon: <SiMysql className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'Arduino',
    category: 'IoT',
    level: 'Intermediate',
    description: 'Hardware programming',
    icon: <SiArduino className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'GitHub',
    category: 'Tools',
    level: 'Advanced',
    description: 'Version control platform',
    icon: <FaGithub className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
  { 
    name: 'WordPress',
    category: 'CMS',
    level: 'Intermediate',
    description: 'Content management system',
    icon: <FaWordpress className="w-7 h-7 sm:w-8 sm:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
  },
];

const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Database', 'IoT', 'Tools', 'CMS'];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const controls = useAnimation();
  
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

  // Filter skills based on selected category and search
  const filteredSkills = skills
    .filter(skill => 
      (selectedCategory === 'All' || skill.category === selectedCategory) &&
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollInterval;
    let isHovered = false;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (!isHovered && container) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          const currentScroll = container.scrollLeft;
          
          if (currentScroll >= maxScroll) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft += 1;
          }
        }
      }, 30);
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };

    const handleMouseLeave = () => {
      isHovered = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    startAutoScroll();

    return () => {
      clearInterval(scrollInterval);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [filteredSkills]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedSkill && !event.target.closest('.modal-content')) {
        setSelectedSkill(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedSkill]);

  // Get level percentage for progress bar
  const getLevelPercentage = (level) => {
    switch (level) {
      case 'Expert': return 100;
      case 'Advanced': return 80;
      case 'Intermediate': return 60;
      default: return 0;
    }
  };

  // Get level color shade (monochrome)
  const getLevelShade = (level) => {
    switch (level) {
      case 'Expert': return 'bg-black';
      case 'Advanced': return 'bg-gray-600';
      case 'Intermediate': return 'bg-gray-400';
      default: return 'bg-gray-200';
    }
  };

  return (
    <>
      <motion.section 
        ref={sectionRef}
        id="skills"
        style={{ opacity }}
        className="h-auto min-h-[calc(100vh-4rem)] sm:min-h-screen flex flex-col justify-start items-center bg-white px-2 sm:px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 md:py-12 lg:py-24 relative overflow-hidden">
        {/* Decorative background elements - monochrome, scaled for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 sm:top-20 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-gray-200 rounded-full filter blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gray-300 rounded-full filter blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          {/* Section Header - More compact on mobile */}
          <motion.div
            style={{ opacity, scale, y }}
            className="text-center mb-3 sm:mb-4 md:mb-6 md:mb-8 px-0 sm:px-2 sm:px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-1 sm:mb-2 flex justify-center"
            >
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 tracking-wider uppercase bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                What I Do
              </span>
            </motion.div>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:text-6xl font-bold text-gray-900 mb-1 sm:mb-2 leading-tight">
              <span className="relative inline-block">
                My Skills
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute bottom-0 sm:bottom-1 sm:bottom-2 left-0 h-0.5 sm:h-1 sm:h-3 bg-gray-300 -z-10"
                />
              </span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-3 sm:mb-4 md:mb-6 px-0 sm:px-2 leading-tight">
              Technologies and tools I use to bring ideas to life
            </p>

            {/* Search Bar - More compact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-3 sm:mb-4 md:mb-6 md:mb-8 w-full max-w-xs sm:max-w-md mx-auto px-0 sm:px-2"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 pl-8 sm:pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-200 transition-all duration-300 bg-gray-50"
                />
                <svg className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-3.5 sm:h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>

            {/* Category Filter - More compact on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-3 sm:mb-4 md:mb-6 md:mb-8"
            >
              {/* Mobile: Horizontal scroll with tighter spacing */}
              <div className="sm:hidden overflow-x-auto scrollbar-hide -mx-2 px-2">
                <div className="flex gap-1 min-w-max pb-1">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        selectedCategory === category
                          ? 'bg-black text-white shadow-md'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                      <span className="ml-0.5 text-[7px] opacity-70">
                        ({category === 'All' ? filteredSkills.length : skills.filter(s => s.category === category).length})
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Desktop: Flex wrap */}
              <div className="hidden sm:flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-black text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                    <span className="ml-1 sm:ml-2 text-[8px] sm:text-[9px] md:text-[10px] opacity-70">
                      ({category === 'All' ? filteredSkills.length : skills.filter(s => s.category === category).length})
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Horizontal Scrollable Skills - More compact cards on mobile */}
          <div className="relative w-full flex-1">
            {/* Gradient overlays - Adjusted for mobile */}
            <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              ref={scrollContainerRef}
              style={{ opacity, scale }}
              className="overflow-x-auto scrollbar-hide pb-3 sm:pb-4 md:pb-6 md:pb-8 -mx-2 px-2 sm:-mx-3 sm:px-3 md:mx-0 md:px-0 scroll-smooth flex-1"
            >
              <div className="flex gap-1.5 sm:gap-2 md:gap-4 md:gap-6 px-0 sm:px-0 md:px-4 min-w-max py-1">
                {filteredSkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group cursor-pointer flex-shrink-0"
                  >
                    <div className="relative bg-white rounded-md sm:rounded-lg md:rounded-xl md:rounded-2xl border border-gray-300 p-1.5 sm:p-2 md:p-3 md:p-4 lg:p-6 transition-all duration-300 hover:shadow-2xl hover:border-black active:scale-95 hover:-translate-y-0.5 sm:hover:-translate-y-1 md:hover:-translate-y-2 w-24 sm:w-28 md:w-32 md:w-40 lg:w-48 h-28 sm:h-32 md:h-36 md:h-44 lg:h-52 flex flex-col justify-between">
                      {/* Decorative blur on hover - monochrome */}
                      <div className="absolute -inset-0.5 sm:-inset-1 md:-inset-2 bg-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10" />

                      {/* Level Badge - Monochrome, smaller on mobile */}
                      <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 md:top-1.5 md:right-1.5 md:top-2 md:right-2">
                        <span className={`text-[6px] sm:text-[6px] md:text-[7px] md:text-[9px] font-bold px-0.5 py-0.5 sm:px-1 sm:py-0.5 md:px-1.5 md:py-0.5 md:px-2 md:py-1 rounded-full bg-gray-100 text-gray-700 border border-gray-300`}>
                          {skill.level}
                        </span>
                      </div>

                      {/* Icon & Name */}
                      <div className="flex flex-col items-center gap-0.5 sm:gap-1 md:gap-2 md:gap-3 flex-1 justify-center">
                        <motion.div 
                          whileHover={{ scale: 1.15, rotate: 360 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.5 }}
                          className="text-gray-900 group-hover:text-black transition-colors duration-300 flex-shrink-0"
                        >
                          {skill.icon}
                        </motion.div>

                        {/* Skill Name - Tighter line height */}
                        <h3 className="text-[7px] sm:text-[8px] md:text-[10px] md:text-xs lg:text-sm font-bold text-gray-900 text-center leading-tight px-0.5">
                          {skill.name}
                        </h3>
                      </div>

                      {/* Description on Hover - Hidden on mobile */}
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredSkill === skill.name ? 1 : 0,
                          height: hoveredSkill === skill.name ? 'auto' : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden hidden sm:block"
                      >
                        <p className="text-[7px] sm:text-[8px] md:text-[9px] md:text-[10px] text-gray-600 text-center mt-1 border-t border-gray-300 pt-1 leading-tight">
                          {skill.description}
                        </p>
                      </motion.div>

                      {/* Progress Bar - Thinner on mobile */}
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-0.5 sm:h-0.5 md:h-1">
                        <motion.div
                          className={`h-0.5 sm:h-0.5 md:h-1 rounded-full ${getLevelShade(skill.level)}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${getLevelPercentage(skill.level)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.1 }}
                        />
                      </div>

                      {/* Floating accent element - Hidden on mobile */}
                      <motion.div
                        animate={{ 
                          y: [0, -5, 0],
                          opacity: [0, 0.1, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: index * 0.2 
                        }}
                        className="hidden sm:block absolute top-1 right-1 sm:top-2 sm:right-2 md:top-4 md:right-4 w-4 sm:w-8 md:w-12 h-4 sm:h-8 md:h-12 bg-black rounded-full blur-2xl pointer-events-none opacity-0"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Scroll hint & Stats - More compact on mobile */}
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4 md:mt-6 px-2 sm:px-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-[10px] sm:text-xs sm:text-sm text-gray-600 font-medium text-center"
              >
                <span className="inline-flex items-center gap-0.5 sm:gap-1 md:gap-1.5 flex-wrap justify-center">
                  <span className="w-1 h-1 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 bg-gray-500 rounded-full animate-pulse"></span>
                  Showing <span className="font-bold text-gray-900">{filteredSkills.length}</span> {filteredSkills.length === 1 ? 'skill' : 'skills'}
                </span>
                {selectedCategory !== 'All' && (
                  <span className="block sm:inline sm:ml-2 text-gray-400 text-[7px] sm:text-[8px] md:text-[10px] md:text-xs mt-0.5 sm:mt-0">in {selectedCategory}</span>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
              >
                <p className="text-[7px] sm:text-[8px] md:text-[9px] md:text-xs text-gray-400 flex items-center justify-center gap-0.5 sm:gap-1 md:gap-2 flex-wrap">
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 md:w-4 md:h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  <span className="hidden sm:inline">Auto-scroll • Hover to pause</span>
                  <span className="sm:hidden">Swipe to explore</span>
                  <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 md:w-4 md:h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skill Detail Modal - More compact on mobile */}
      {selectedSkill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-1 sm:p-2 sm:p-4"
          onClick={() => setSelectedSkill(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="modal-content bg-white rounded-lg sm:rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 md:p-8 max-w-xs sm:max-w-sm sm:max-w-md w-full max-h-[85vh] overflow-y-auto mx-1 sm:mx-2"
          >
            <div className="flex justify-between items-start mb-2 sm:mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {selectedSkill.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate">{selectedSkill.name}</h3>
                  <p className="text-[10px] sm:text-xs sm:text-sm text-gray-600 capitalize">{selectedSkill.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-1 sm:ml-2 md:ml-4"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-2 sm:mb-3">
              <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-1.5 sm:mb-2 leading-tight">{selectedSkill.description}</p>
              <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5 md:h-2">
                <motion.div
                  className={`h-1 sm:h-1.5 md:h-2 rounded-full ${getLevelShade(selectedSkill.level)}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${getLevelPercentage(selectedSkill.level)}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <p className="text-[10px] sm:text-xs sm:text-sm text-gray-500 mt-1">Level: {selectedSkill.level}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-[10px]">Category</p>
                <p className="font-semibold">{selectedSkill.category}</p>
              </div>
              <div>
                <p className="text-gray-500 text-[10px]">Proficiency</p>
                <p className="font-semibold">{getLevelPercentage(selectedSkill.level)}%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}