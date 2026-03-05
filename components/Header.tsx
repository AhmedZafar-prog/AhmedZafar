
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && !(e.target as Element).closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'work' },
    { label: 'Achievements', id: 'certifications' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -15,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 30, filter: 'blur(10px)' },
    open: { opacity: 1, x: 0, filter: 'blur(0px)' },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-5 flex justify-between items-center backdrop-blur-md bg-opacity-80 border-b border-white/5 mobile-menu-container">
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}
        className="text-2xl font-black tracking-tighter hover:opacity-70 transition-opacity z-[110]"
      >
        AZ
      </a>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        <ul className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em]">
          {navItems.map((item) => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`} 
                onClick={(e) => scrollToSection(e, item.id)}
                className="hover:opacity-50 transition-opacity cursor-pointer block py-1"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="hover:opacity-50 transition-opacity cursor-pointer block py-1"
            >
              Contact
            </a>
          </li>
        </ul>
        <button 
          onClick={toggleTheme}
          className={`p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Controls Toggle */}
      <div className="flex md:hidden items-center gap-3 z-[110]">
        <button 
          onClick={toggleTheme}
          className={`p-2.5 rounded-full transition-all duration-300 shadow-lg ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`relative p-2 w-10 h-10 flex flex-col justify-center items-center group transition-all duration-500 rounded-full ${isMenuOpen ? (theme === 'dark' ? 'bg-white/10' : 'bg-black/10') : ''}`}
          aria-label="Toggle Menu"
        >
          <div className="flex flex-col gap-1.5 items-end w-5 pointer-events-none">
            <span className={`h-0.5 rounded-full transition-all duration-500 ${theme === 'dark' ? 'bg-white' : 'bg-black'} ${isMenuOpen ? 'w-5 rotate-45 translate-y-2' : 'w-5'}`} />
            <span className={`h-0.5 rounded-full transition-all duration-500 ${theme === 'dark' ? 'bg-white' : 'bg-black'} ${isMenuOpen ? 'opacity-0 w-0' : 'w-3 group-hover:w-5'}`} />
            <span className={`h-0.5 rounded-full transition-all duration-500 ${theme === 'dark' ? 'bg-white' : 'bg-black'} ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-2' : 'w-5'}`} />
          </div>
        </button>
      </div>

      {/* Futuristic "Hyper-Contrast" Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className={`absolute top-full right-6 mt-4 w-72 rounded-[2.2rem] border-2 overflow-hidden shadow-2xl backdrop-blur-md z-[105] ${
              theme === 'dark' ? 'bg-zinc-950/95 border-white/20 text-white' : 'bg-white/95 border-black/10 text-black'
            }`}
          >
            {/* Ambient Background Detail */}
            <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-from),transparent_60%)] ${theme === 'dark' ? 'from-white/20' : 'from-black/10'}`} />
            
            <div className="flex flex-col relative z-10">
              <ul className="flex flex-col p-2 gap-1.5">
                {navItems.map((item, idx) => (
                  <motion.li key={item.id} variants={itemVariants}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`group relative flex items-center justify-between px-6 py-5 rounded-[1.5rem] transition-all overflow-hidden`}
                    >
                      {/* Hover Expansion Background (Inverts Color) */}
                      <div className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0 ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} />
                      
                      <div className="relative z-10 flex items-center gap-4">
                        <span className={`text-[11px] font-[1000] uppercase tracking-[0.2em] transition-colors duration-500 ${theme === 'dark' ? 'group-hover:text-black' : 'group-hover:text-white'}`}>
                          {item.label}
                        </span>
                      </div>

                      <div className={`relative z-10 w-1.5 h-1.5 rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} />
                    </a>
                  </motion.li>
                ))}

                <motion.li variants={itemVariants} className="mt-4 p-2">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, 'contact')}
                    className={`group relative flex items-center justify-center gap-4 w-full py-6 rounded-[1.6rem] font-black text-[10px] uppercase tracking-[0.4em] shadow-xl overflow-hidden transition-all active:scale-95 ${
                      theme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                    }`}
                  >
                    <span className="relative z-10">Contact</span>
                    
                    {/* Scanline Animation */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
                      <div className={`absolute top-0 left-0 w-full h-[1px] ${theme === 'dark' ? 'bg-black' : 'bg-white'} animate-[scan_2s_infinite]`} />
                    </div>
                  </a>
                </motion.li>
              </ul>

              <div className={`px-8 py-4 flex items-center justify-center border-t border-current border-opacity-10 bg-current bg-opacity-[0.02]`}>
                <div className="flex gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 h-1 rounded-full bg-current opacity-10`} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </nav>
  );
};

export default Header;
