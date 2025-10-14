'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function FooterSection() {
  return (
    <footer className='bg-white border-t border-gray-200'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='flex flex-col sm:flex-row justify-between items-center gap-6'
        >
          {/* Logo/Brand */}
          <div className='text-center sm:text-left'>
            <h3 className='text-xl sm:text-2xl font-bold text-black mb-2'>D.</h3>
            <p className='text-sm text-gray-600'>Frontend Developer</p>
          </div>

          {/* Social Links */}
          <div className='flex items-center gap-4'>
            <span className='text-sm text-gray-600 hidden sm:inline'>Follow me:</span>
            <a 
              href='https://www.instagram.com/dapaal__/' 
              target='_blank' 
              rel='noopener noreferrer' 
              className='text-sm font-semibold text-black hover:text-gray-600 transition-colors duration-300'
            >
              @dapaal
            </a>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='mt-8 pt-6 border-t border-gray-200 text-center'
        >
          <p className='text-xs sm:text-sm text-gray-500'>
            © {new Date().getFullYear()} Dhafa. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
