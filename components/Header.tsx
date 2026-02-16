
import React from 'react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
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

  const navItems = [
    { label: 'About', id: 'about' },
    { label: 'Education', id: 'education' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'work' },
    { label: 'Certifications', id: 'certifications' },
    { label: 'Contact Me', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center backdrop-blur-md bg-opacity-80 border-b border-white/5">
      <div className="flex justify-between items-center w-full md:w-auto mb-4 md:mb-0">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xl font-black tracking-tighter hover:opacity-70 transition-opacity"
        >
          AZ
        </a>
        <div className="md:hidden">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
        </div>
      </div>
      
      <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto md:overflow-visible no-scrollbar">
        <ul className="flex gap-4 md:gap-8 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap mx-auto md:mx-0">
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
        </ul>
        <button 
          onClick={toggleTheme}
          className={`hidden md:block p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;
