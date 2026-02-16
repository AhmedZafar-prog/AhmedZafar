
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Theme } from '../types';

interface FooterProps {
  theme: Theme;
}

const SlideToCall: React.FC<{ theme: Theme; phoneNumber: string }> = ({ theme, phoneNumber }) => {
  const x = useMotionValue(0);
  const [isCalled, setIsCalled] = useState(false);
  
  // Responsive drag range
  const dragRange = typeof window !== 'undefined' && window.innerWidth < 768 ? 160 : 220; 
  
  const opacity = useTransform(x, [0, dragRange / 1.5], [1, 0]);
  const scale = useTransform(x, [0, dragRange], [1, 1.05]);

  const handleDragEnd = () => {
    if (x.get() >= dragRange - 20) {
      setIsCalled(true);
      window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
      setTimeout(() => {
        x.set(0);
        setIsCalled(false);
      }, 2000);
    } else {
      x.set(0);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div 
        className={`relative w-full max-w-[400px] h-24 rounded-[2.5rem] border-2 flex items-center p-3 overflow-hidden transition-all duration-300 ${
          theme === 'dark' ? 'border-white/10 bg-zinc-900/50' : 'border-black/5 bg-white shadow-sm'
        }`}
      >
        {/* Progress Background */}
        <motion.div 
          className="absolute inset-y-0 left-0 bg-green-500/10"
          style={{ width: x }}
        />

        {/* The Number Track Text */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto px-12 text-center"
        >
          <span className="text-[8px] font-black tracking-[0.4em] uppercase opacity-30 mb-0.5">
            Slide to Call
          </span>
          <span className="text-base md:text-lg font-[900] tracking-tight">
            {phoneNumber}
          </span>
        </motion.div>

        {/* The Slider Handle */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: dragRange }}
          dragElastic={0.05}
          style={{ x, scale, touchAction: "pan-x" }}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 w-20 h-full rounded-[1.8rem] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl transition-colors duration-300 ${
            theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
          } ${isCalled ? '!bg-green-500 !text-white' : ''}`}
        >
          {isCalled ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-pulse">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const email = "ahmedzafar195910@gmail.com";
  const phone = "+92 327 2130901";

  const socialLinks = [
    { 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/search/results/all/?keywords=ahmedzafar195910@gmail.com', 
      icon: (
        <React.Fragment>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </React.Fragment>
      )
    },
    { 
      label: 'GitHub', 
      url: 'https://github.com/AhmedZafar-prog', 
      icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /> 
    },
    { 
      label: 'Instagram', 
      url: 'https://www.instagram.com/4hmed_zafar?igsh=MWZnbDM2ODhtaG01NA==', 
      icon: (
        <React.Fragment>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </React.Fragment>
      )
    }
  ];

  return (
    <footer id="contact" className={`py-40 border-t scroll-mt-24 ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h2 className="text-6xl md:text-9xl font-[1000] mb-32 tracking-tighter uppercase leading-none text-center">
          Let's<br/>Connect
        </h2>

        {/* Contact Grid with Matching Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 w-full max-w-5xl mb-32 items-center">
          
          {/* Email Section - Matches SlideToCall size */}
          <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30">Inquiries</span>
            <div className="w-full flex justify-center">
              <a 
                href={`mailto:${email}`}
                className={`group relative w-full max-w-[400px] h-24 rounded-[2.5rem] border-2 flex items-center justify-center transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                  theme === 'dark' ? 'border-white/10 bg-zinc-900/50' : 'border-black/5 bg-white shadow-sm'
                }`}
              >
                <div className="flex flex-col items-center text-center px-6">
                  <span className="text-[8px] font-black tracking-[0.4em] uppercase opacity-30 mb-0.5">Send Email</span>
                  <span className="text-sm md:text-base font-[900] tracking-tight truncate max-w-full">
                    {email}
                  </span>
                </div>
                <div className={`absolute right-4 w-12 h-12 rounded-[1.2rem] flex items-center justify-center transition-colors ${
                  theme === 'dark' ? 'bg-white/5 text-white' : 'bg-black/5 text-black'
                } group-hover:bg-blue-500 group-hover:text-white`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </div>
              </a>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-20">Tap to open mail client</p>
          </div>

          {/* Phone Section */}
          <div className="flex flex-col items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-30">Direct Call</span>
            <SlideToCall theme={theme} phoneNumber={phone} />
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-20">Slide right to initiate call</p>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-40">
          {socialLinks.map((link) => (
            <a 
              key={link.label}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group flex items-center gap-3 px-10 py-5 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${
                theme === 'dark' ? 'border-white/10 hover:bg-white hover:text-black' : 'border-black/10 hover:bg-black hover:text-white'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-12">
                {link.icon}
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest">{link.label}</span>
            </a>
          ))}
          <a 
            href={`mailto:${email}`}
            className={`group flex items-center gap-3 px-10 py-5 rounded-full border-2 transition-all hover:scale-110 active:scale-95 ${
              theme === 'dark' ? 'border-white/10 hover:bg-white hover:text-black' : 'border-black/10 hover:bg-black hover:text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-12">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Mail App</span>
          </a>
        </div>

        <div className="text-center">
          <p className="text-[10px] font-black tracking-[0.6em] opacity-20 uppercase">
            © {new Date().getFullYear()} Ahmed Zafar •
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
