
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import ProjectsCarousel from './components/ProjectsCarousel';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-50 text-zinc-900'}`}>
      <ScrollProgress theme={theme} />
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Hero theme={theme} />
        <About theme={theme} />
        <Education theme={theme} />
        <Skills theme={theme} />
        <ProjectsCarousel theme={theme} />
        <Certifications theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default App;
