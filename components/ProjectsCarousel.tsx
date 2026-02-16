import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Theme, ProjectItem } from '../types';

interface ProjectsProps { theme: Theme; }

const PROJECTS: ProjectItem[] = [
 {
    title: "Engineering Company Profile",
    category: "Web Profile",
    description: "Developed a structured and responsive company profile website for Adnan Engineering to present industrial services and organizational info.",
    link: "https://adnanengineering.pk",
    media: [
      { 
        type: 'video', 
        url: '/assets/videos/SiteVideo.mp4' 
      },
    ],
    tags: ["Engineering", "Fabrication", "Industrial Works"]
  },
  {
    title: "Tree of Hope – Environmental Awareness Initiative",
    category: "Leadership & Executions",
    description: "Led the Environmental Society’s Open Day stall, distributing baby plants and engaging parents to write pledges on a symbolic “Tree of Hope,” fostering environmental responsibility and community impact.",
    link: "#",
    media: [
      { 
        type: 'video', 
        url: '/assets/videos/opendayvideo.mp4' 
      },
    ],
    tags: ["Leadership", "Community engagement", "Social awareness"]
  },
  {
    title: "Python Number Gussing Game",
    category: "Python Coding",
    description: "Created an interactive number guessing game where the player tries to guess a number selected by the computer. The game features three difficulty levels, each progressively more challenging than the last",
    link: "#",
    media: [
      { 
        type: 'video', 
        url: '/assets/videos/PythonGame.mp4' 
      },
    ],
    tags: ["Python", "Game"]
  },
];

const LampLetter: React.FC<{ theme: Theme; isLightOn: boolean; onToggle: () => void }> = ({ theme, isLightOn, onToggle }) => {
  const pullY = useMotionValue(0);
  const pullSpring = useSpring(pullY, { stiffness: 300, damping: 20 });
  const cordScaleY = useTransform(pullSpring, [0, 50], [1, 1.6]);

  const handlePullEnd = () => {
    if (pullY.get() > 20) {
      onToggle();
    }
    pullY.set(0);
  };

  return (
    <div className="relative inline-flex flex-col items-center mx-1 sm:mx-2 h-[1em] translate-y-[0.05em] group/lamp">
      {/* Redesigned Centered Light Cone Effect */}
      <AnimatePresence>
        {isLightOn && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1400px] h-[600px] md:h-[1000px] pointer-events-none z-[-1]"
          >
            {/* Main Central Glow */}
            <div 
              className="w-full h-full"
              style={{
                background: `conic-gradient(from 120deg at 50% 15%, rgba(255, 215, 0, ${theme === 'dark' ? '0.25' : '0.4'}) 0deg, rgba(255, 215, 0, 0) 120deg)`,
                filter: 'blur(60px)',
                transform: 'rotate(0deg)'
              }}
            />
            {/* Extra Ambient Radiance */}
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                background: `radial-gradient(circle at 50% 20%, rgba(255, 230, 100, ${theme === 'dark' ? '0.15' : '0.25'}) 0%, transparent 60%)`,
                filter: 'blur(80px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Lamp Body - Fully clickable/touchable */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="relative z-10 cursor-pointer active:scale-95 transition-transform"
      >
        <svg width="0.6em" height="1em" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
          {/* Lamp Shade */}
          <path 
            d="M10 35L18 5H42L50 35H10Z" 
            fill={isLightOn ? (theme === 'dark' ? '#fff' : '#fbbf24') : (theme === 'dark' ? '#1a1a1a' : '#d4d4d8')} 
            stroke={theme === 'dark' ? '#333' : '#a1a1aa'} 
            strokeWidth="1"
            className="transition-colors duration-500"
          />
          
          {/* Internal Glow Bulb Area */}
          <AnimatePresence>
            {isLightOn && (
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                d="M15 32L21 8H39L45 32H15Z" 
                fill="rgba(255, 255, 255, 1)"
              />
            )}
          </AnimatePresence>
          
          {/* Neck */}
          <rect x="27" y="35" width="6" height="50" fill={isLightOn ? (theme === 'dark' ? '#fff' : '#000') : (theme === 'dark' ? '#333' : '#71717a')} className="transition-colors duration-500" />
          
          {/* Base */}
          <rect x="15" y="85" width="30" height="6" rx="3" fill={isLightOn ? (theme === 'dark' ? '#fff' : '#000') : (theme === 'dark' ? '#222' : '#52525b')} className="transition-colors duration-500" />
        </svg>
      </div>

      {/* Pull Cord - Independent Interaction but visually part of lamp */}
      <div className="absolute top-[30%] left-[80%] flex flex-col items-center pointer-events-auto z-20">
        <motion.div 
          style={{ scaleY: cordScaleY }}
          className={`w-[1px] h-10 md:h-20 origin-top transition-colors duration-500 ${theme === 'dark' ? 'bg-white/30' : 'bg-black/30'}`}
        />
        <div className="relative">
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 40 }}
            dragElastic={0.1}
            style={{ y: pullY }}
            onDragEnd={handlePullEnd}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className={`w-4 h-6 md:w-3 md:h-5 rounded-full cursor-grab active:cursor-grabbing shadow-xl border transition-colors ${
              theme === 'dark' ? 'bg-zinc-100 border-zinc-400' : 'bg-zinc-800 border-zinc-950'
            }`}
          />
          {/* cord-specific tap area boost */}
          <div 
            className="absolute inset-[-25px] cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }} 
          />
        </div>
      </div>
    </div>
  );
};

const ComingSoonCard: React.FC<{ theme: Theme; isActive: boolean }> = ({ theme, isActive }) => {
  const [isLightOn, setIsLightOn] = useState(false);

  return (
    <div className={`flex-shrink-0 w-full md:w-[750px] transition-all duration-1000 ease-[cubic-bezier(0.2,1,0.3,1)] ${isActive ? 'opacity-100 scale-100' : 'opacity-20 scale-90 grayscale'}`}>
      <div className={`relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] aspect-[16/10] mb-8 shadow-2xl border transition-colors duration-700 flex flex-col items-center justify-center ${
        isLightOn 
          ? (theme === 'dark' ? 'bg-zinc-800 border-yellow-500/10' : 'bg-yellow-50/20 border-yellow-500/10') 
          : (theme === 'dark' ? 'bg-zinc-950 border-white/5' : 'bg-zinc-200 border-black/5')
      }`}>
        <div className="text-center relative z-10 select-none flex flex-col items-center w-full px-4">
          <div className="flex flex-col items-center w-full">
            <motion.h4 
              animate={{ 
                opacity: isLightOn ? 1 : 0.1,
                textShadow: isLightOn ? (theme === 'dark' ? "0 0 40px rgba(255,215,0,0.5)" : "0 0 30px rgba(255,165,0,0.3)") : "none",
                color: isLightOn ? (theme === 'dark' ? '#fff' : '#000') : 'inherit',
                scale: isLightOn ? 1.02 : 1
              }}
              className="text-4xl sm:text-6xl md:text-[10rem] font-[1000] tracking-tighter uppercase leading-none flex items-baseline justify-center whitespace-nowrap"
            >
              <span>COM</span>
              <LampLetter theme={theme} isLightOn={isLightOn} onToggle={() => setIsLightOn(!isLightOn)} />
              <span>NG</span>
            </motion.h4>
            <motion.h4 
              animate={{ 
                opacity: isLightOn ? 1 : 0.05,
                textShadow: isLightOn ? (theme === 'dark' ? "0 0 40px rgba(255,215,0,0.4)" : "0 0 30px rgba(255,165,0,0.2)") : "none",
                color: isLightOn ? (theme === 'dark' ? '#fff' : '#000') : 'inherit',
                scale: isLightOn ? 1.02 : 1
              }}
              className="text-4xl sm:text-6xl md:text-[10rem] font-[1000] tracking-tighter uppercase leading-none -mt-2 md:-mt-4"
            >
              SOON
            </motion.h4>
          </div>
          <motion.p 
            animate={{ opacity: isLightOn ? 0.6 : 0.2 }}
            className={`text-[8px] md:text-[10px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase mt-6 md:mt-8 transition-all duration-700 ${isLightOn ? 'text-yellow-500' : ''}`}
          >
            {isLightOn ? "" : "Tap the Lamp "}
          </motion.p>
        </div>
        {!isLightOn && (
           <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none`} />
        )}
      </div>
      <div className="px-6 md:px-12 text-center md:text-left">
        <span className="text-xs uppercase tracking-[0.4em] font-black opacity-30">Under Construction</span>
        <h3 className="text-3xl md:text-6xl font-[1000] mt-4 mb-6 tracking-tighter leading-tight">Mystery Brewing</h3>
        <p className={`text-base md:text-xl leading-relaxed font-light transition-opacity duration-700 ${isActive ? 'opacity-40' : 'opacity-0'}`}>
          Currently experimenting with new ideas. Can’t wait to share it soon!
        </p>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{ project: ProjectItem; theme: Theme; isActive: boolean }> = ({ project, theme, isActive }) => {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentMedia = project.media[0];

  return (
    <div className={`flex-shrink-0 w-full md:w-[750px] transition-all duration-1000 ease-[cubic-bezier(0.2,1,0.3,1)] ${isActive ? 'opacity-100 scale-100' : 'opacity-20 scale-90 grayscale'}`}>
      <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] aspect-[16/10] mb-8 bg-zinc-900 shadow-2xl border border-white/5">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-30">
            <div className="w-10 h-10 border-4 border-white/10 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <div className="w-full h-full relative z-0">
          {currentMedia.type === 'image' ? (
            <img 
              src={currentMedia.url} 
              alt={project.title} 
              onLoad={() => setIsLoading(false)}
              onError={(e) => { 
                setIsLoading(false);
                e.currentTarget.src = `https://picsum.photos/1000/600?random=${project.title.length}`; 
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <video 
              ref={videoRef}
              src={currentMedia.url} 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
              onCanPlay={() => setIsLoading(false)}
              onError={(e) => { 
                setIsLoading(false);
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <a 
            href={project.link || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center z-20 ${isActive ? 'opacity-0 hover:opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <div className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-black text-[8px] md:text-[10px] tracking-[0.3em] uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl">
              Visit Project
            </div>
          </a>
        </div>
      </div>
      <div className="px-6 md:px-12">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-black opacity-30">{project.category}</span>
          {isActive && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          )}
        </div>
        <h3 className="text-3xl md:text-6xl font-[1000] mb-6 tracking-tighter leading-tight">{project.title}</h3>
        <p className={`text-base md:text-xl leading-relaxed font-light mb-8 md:mb-10 transition-opacity duration-700 ${isActive ? 'opacity-60' : 'opacity-0'}`}>
          {project.description}
        </p>
        <div className={`flex flex-wrap gap-2 md:gap-3 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          {project.tags.map((tag, tIdx) => (
            <span key={tIdx} className={`text-[8px] md:text-[9px] px-4 md:px-5 py-2 rounded-full font-black tracking-widest uppercase border ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsCarousel: React.FC<ProjectsProps> = ({ theme }) => {
  const ALL_ITEMS = [...PROJECTS, { isComingSoon: true } as any];
  const extendedProjects = [...ALL_ITEMS, ...ALL_ITEMS, ...ALL_ITEMS];
  const [activeIndex, setActiveIndex] = useState(ALL_ITEMS.length);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [cardWidth, setCardWidth] = useState(750);
  const [gap, setGap] = useState(64);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768;
      setCardWidth(isMobile ? window.innerWidth - 32 : 750);
      setGap(isMobile ? 16 : 64);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const nextProject = useCallback(() => {
    setShouldAnimate(true);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const prevProject = useCallback(() => {
    setShouldAnimate(true);
    setActiveIndex((prev) => prev - 1);
  }, []);

  const handleTransitionEnd = () => {
    if (activeIndex >= ALL_ITEMS.length * 2) {
      setShouldAnimate(false);
      setActiveIndex(activeIndex - ALL_ITEMS.length);
    } else if (activeIndex < ALL_ITEMS.length) {
      setShouldAnimate(false);
      setActiveIndex(activeIndex + ALL_ITEMS.length);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextProject, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextProject]);

  const totalCardWidth = cardWidth + gap;
  const offset = `calc(50% - ${cardWidth / 2}px - ${activeIndex * totalCardWidth}px)`;

  return (
    <section id="work" className="py-24 md:py-40 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-9xl font-[1000] mb-8 tracking-tighter uppercase leading-none">
          Projects
        </h2>
      </div>

      <div 
        className="relative flex flex-col items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full flex items-center justify-center min-h-[500px] md:min-h-[800px]">
          {/* Navigation Arrows */}
          <div className="absolute inset-x-0 top-[40%] md:top-[35%] -translate-y-1/2 z-30 flex justify-between px-2 md:px-16 pointer-events-none">
            <button 
              onClick={() => { prevProject(); setIsPaused(true); }} 
              className={`pointer-events-auto p-4 md:p-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-lg ${theme === 'dark' ? 'border-white/10 bg-black/40 hover:bg-white hover:text-black' : 'border-black/10 bg-white/40 hover:bg-black hover:text-white'}`} 
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => { nextProject(); setIsPaused(true); }} 
              className={`pointer-events-auto p-4 md:p-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-lg ${theme === 'dark' ? 'border-white/10 bg-black/40 hover:bg-white hover:text-black' : 'border-black/10 bg-white/40 hover:bg-black hover:text-white'}`} 
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div 
            onTransitionEnd={handleTransitionEnd}
            className={`flex items-start ${shouldAnimate ? 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,1,0.3,1)]' : ''}`}
            style={{ transform: `translateX(${offset})` }}
          >
            {extendedProjects.map((project, idx) => (
              <div 
                key={idx} 
                style={{ width: cardWidth, marginRight: gap }}
                className="flex-shrink-0"
              >
                {project.isComingSoon ? (
                  <ComingSoonCard theme={theme} isActive={idx === activeIndex} />
                ) : (
                  <ProjectCard 
                    project={project} 
                    theme={theme} 
                    isActive={idx === activeIndex} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex flex-col items-center gap-6 md:gap-10 mt-12 md:mt-20">
          <div className="flex gap-2 md:gap-3">
            {ALL_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => { 
                  setShouldAnimate(true);
                  setActiveIndex(i + ALL_ITEMS.length); 
                  setIsPaused(true); 
                }}
                className={`h-1.5 transition-all duration-700 rounded-full bg-current ${activeIndex % ALL_ITEMS.length === i ? 'w-8 md:w-12 opacity-100' : 'w-1.5 md:w-2 opacity-10'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
