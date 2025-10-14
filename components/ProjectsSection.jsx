'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    name: 'COOMINGSOON',
    image: '/project1.jpg',
    githubUrl: 'https://github.com/dhafaal/ecommerce',
    description: 'COOMINGSOON'
  },
  {
    id: 2,
    name: 'Employee Sheduler',
    image: '/project2.png',
    githubUrl: 'https://github.com/dhafaal/lintasarta',
    description: 'Employee scheduling app with real-time notifications and calendar integration'
  },
  {
    id: 3,
    name: 'Portfolio Website',
    image: '/project3.png',
    githubUrl: 'https://github.com/dhafaal/portfolio',
    description: 'Modern portfolio website with smooth animations and interactions'
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
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
    <>
      <motion.section 
        ref={sectionRef}
        id="projects"
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

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            style={{ opacity, scale, y }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 flex justify-center"
            >
              <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 tracking-wider uppercase bg-gray-50 px-4 py-2 rounded-full">
                Portfolio
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              <span className="relative inline-block">
                My Projects
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="absolute bottom-2 left-0 h-3 bg-gray-200 -z-10"
                />
              </span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              A collection of projects I've worked on
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            style={{ opacity, scale }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
                  {/* Decorative blur on hover */}
                  <div className="absolute -inset-2 bg-gray-100 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10" />

                  {/* Image Container */}
                  <div className="relative h-48 sm:h-56 lg:h-64 bg-gray-200 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold">View Details</span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {project.description}
                    </p>
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
                    className="absolute top-4 right-4 w-16 h-16 bg-gray-900 rounded-full blur-2xl pointer-events-none"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>


      {/* Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Project Name */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 pr-8">
                {selectedProject.name}
              </h2>

              {/* Project Image */}
              <div className="relative h-48 sm:h-64 lg:h-96 bg-gray-200 rounded-lg sm:rounded-xl overflow-hidden mb-4 sm:mb-6">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
              </div>

              {/* Project Description */}
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
                {selectedProject.description}
              </p>

              {/* GitHub Button */}
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>VIEW ON GITHUB</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}