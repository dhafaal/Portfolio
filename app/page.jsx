'use client';

import { useState, useEffect, Suspense } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import SuspenseFallback from '@/components/SuspenseFallback';
import Navbar from '@/components/Navbar';
import HomeSection from '@/components/HomeSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <Suspense fallback={<SuspenseFallback />}>
      {showWelcome && <WelcomeScreen onComplete={handleWelcomeComplete} />}
      <Navbar />
      <HomeSection />
      <AboutSection />
      <SkillsSection />
    
    </Suspense>
  );
}