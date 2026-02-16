
import React, { useEffect, useState } from 'react';
import { Theme } from '../types';

interface ScrollProgressProps {
  theme: Theme;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ theme }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
      <div 
        className={`h-full transition-all duration-100 ease-out ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollProgress;
