
import React, { useRef, useState, useEffect, useCallback } from 'react';
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
  {
    title: "Visionary UI System",
    category: "UI/UX Framework",
    description: "A futuristic design language for high-performance dashboards, featuring glassmorphism and real-time motion feedback.",
    link: "#",
    media: [
      { 
        type: 'video', 
        url: '/assets/projects/visionary-ui.mp4' 
      },
    ],
    tags: ["Motion Design", "Framer Motion", "UI/UX"]
  },
  {
    title: "Nova Search Engine",
    category: "Software",
    description: "A lightweight, customizable search indexing engine designed for specialized academic databases.",
    link: "#",
    media: [
      { 
        type: 'image', 
        url: '/assets/projects/nova-search.jpg' 
      },
    ],
    tags: ["Node.js", "Python"]
  }
];

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
            <div className="bg-white text-black px-8 py-4 rounded-full font-black text-[10px] tracking-[0.3em] uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-2xl">
              Visit Project
            </div>
          </a>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs uppercase tracking-[0.4em] font-black opacity-30">{project.category}</span>
          {isActive && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          )}
        </div>
        <h3 className="text-4xl md:text-6xl font-[1000] mb-6 tracking-tighter leading-tight">{project.title}</h3>
        <p className={`text-lg md:text-xl leading-relaxed font-light mb-10 transition-opacity duration-700 ${isActive ? 'opacity-60' : 'opacity-0'}`}>
          {project.description}
        </p>
        <div className={`flex flex-wrap gap-3 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          {project.tags.map((tag, tIdx) => (
            <span key={tIdx} className={`text-[9px] px-5 py-2 rounded-full font-black tracking-widest uppercase border ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectsCarousel: React.FC<ProjectsProps> = ({ theme }) => {
  // Triple the items for seamless infinite scroll
  const extendedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];
  const [activeIndex, setActiveIndex] = useState(PROJECTS.length);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [cardWidth, setCardWidth] = useState(750);
  const [gap, setGap] = useState(64);

  useEffect(() => {
    const updateDimensions = () => {
      const isMobile = window.innerWidth < 768;
      setCardWidth(isMobile ? window.innerWidth - 48 : 750);
      setGap(isMobile ? 24 : 64);
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
    if (activeIndex >= PROJECTS.length * 2) {
      setShouldAnimate(false);
      setActiveIndex(activeIndex - PROJECTS.length);
    } else if (activeIndex < PROJECTS.length) {
      setShouldAnimate(false);
      setActiveIndex(activeIndex + PROJECTS.length);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextProject, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextProject]);

  const totalCardWidth = cardWidth + gap;
  const offset = `calc(50% - ${cardWidth / 2}px - ${activeIndex * totalCardWidth}px)`;

  return (
    <section id="work" className="py-40 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col items-center text-center">
        <h2 className="text-6xl md:text-9xl font-[1000] mb-8 tracking-tighter uppercase leading-none">
          Projects
        </h2>
      </div>

      <div 
        className="relative flex flex-col items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full flex items-center justify-center min-h-[600px] md:min-h-[800px]">
          
          {/* Side Navigation Buttons */}
          <div className="absolute inset-x-0 top-[35%] -translate-y-1/2 z-30 flex justify-between px-4 md:px-16 pointer-events-none">
            <button 
              onClick={() => { prevProject(); setIsPaused(true); }} 
              className={`pointer-events-auto p-6 md:p-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-lg ${theme === 'dark' ? 'border-white/10 bg-black/40 hover:bg-white hover:text-black' : 'border-black/10 bg-white/40 hover:bg-black hover:text-white'}`} 
              aria-label="Previous Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => { nextProject(); setIsPaused(true); }} 
              className={`pointer-events-auto p-6 md:p-8 rounded-full border-2 transition-all hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-lg ${theme === 'dark' ? 'border-white/10 bg-black/40 hover:bg-white hover:text-black' : 'border-black/10 bg-white/40 hover:bg-black hover:text-white'}`} 
              aria-label="Next Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
                <ProjectCard 
                  project={project} 
                  theme={theme} 
                  isActive={idx === activeIndex} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Unified Bottom Dot Indicators */}
        <div className="flex flex-col items-center gap-10 mt-20">
          <div className="flex gap-3">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => { 
                  setShouldAnimate(true);
                  setActiveIndex(i + PROJECTS.length); 
                  setIsPaused(true); 
                }}
                className={`h-1.5 transition-all duration-700 rounded-full bg-current ${activeIndex % PROJECTS.length === i ? 'w-12 opacity-100' : 'w-2 opacity-10'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;