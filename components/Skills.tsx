
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Theme, SkillItem } from '../types';

interface SkillsProps {
  theme: Theme;
}

const skillData: SkillItem[] = [
  { 
    name: "Python", 
    level: 65, 
    description: "Applied Python to implement logical solutions and structured programs, utilizing functions and control flow." 
  },
  { 
    name: "C++", 
    level: 55, 
    description: "Built structured programs using Basic principles, working with arrays and functions." 
  },
  { 
    name: "C", 
    level: 55, 
    description: "Developed foundational programming skills through structured C programs and problem-solving logic." 
  },
  { 
    name: "HTML", 
    level: 70, 
    description: "Designed responsive web pages using HTML and CSS, focusing on semantic structure and clean interfaces." 
  },
  { 
    name: "SQL", 
    level: 45, 
    description: "Created and managed relational databases using SQL, including table design and queries." 
  },
  { 
    name: "Calisthenics", 
    level: 45, 
    description: "Developed strength and mastered push-ups, pull-ups, elbow lever, and various gymnastic poses through bodyweight-based training, focusing on multi-joint movements and functional fitness" 
  },
];

const Skills: React.FC<SkillsProps> = ({ theme }) => {
  const extendedSkills = [...skillData, ...skillData, ...skillData];
  const [activeIndex, setActiveIndex] = useState(skillData.length);
  const [isPaused, setIsPaused] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [cardWidth, setCardWidth] = useState(380);

  useEffect(() => {
    const updateWidth = () => {
      setCardWidth(window.innerWidth < 768 ? 300 : 380);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const nextSkill = useCallback(() => {
    setShouldAnimate(true);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const prevSkill = useCallback(() => {
    setShouldAnimate(true);
    setActiveIndex((prev) => prev - 1);
  }, []);

  const handleTransitionEnd = () => {
    if (activeIndex >= skillData.length * 2) {
      setShouldAnimate(false);
      setActiveIndex(activeIndex - skillData.length);
    } else if (activeIndex < skillData.length) {
      setShouldAnimate(false);
      setActiveIndex(activeIndex + skillData.length);
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSkill, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSkill]);

  const baseIndex = activeIndex % skillData.length;
  const totalCardWidth = cardWidth + 24;

  return (
    <section id="skills" className="py-32 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center flex flex-col items-center">
        <h2 className="text-5xl md:text-8xl font-[1000] mb-6 tracking-tighter uppercase leading-none">
          Skills
        </h2>
      </div>

      <div className="relative flex flex-col items-center group">
        <div className="relative w-full overflow-visible flex items-center justify-center min-h-[450px]">
          
          {/* Side Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-4 md:px-12 pointer-events-none">
            <button 
              onClick={() => { prevSkill(); setIsPaused(true); }}
              className={`pointer-events-auto p-4 md:p-6 rounded-full border-2 transition-all hover:scale-110 active:scale-95 shadow-xl ${theme === 'dark' ? 'border-white/10 bg-black/50 backdrop-blur-md hover:bg-white hover:text-black' : 'border-black/10 bg-white/50 backdrop-blur-md hover:bg-black hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={() => { nextSkill(); setIsPaused(true); }}
              className={`pointer-events-auto p-4 md:p-6 rounded-full border-2 transition-all hover:scale-110 active:scale-95 shadow-xl ${theme === 'dark' ? 'border-white/10 bg-black/50 backdrop-blur-md hover:bg-white hover:text-black' : 'border-black/10 bg-white/50 backdrop-blur-md hover:bg-black hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div 
            onTransitionEnd={handleTransitionEnd}
            className={`flex ${shouldAnimate ? 'transition-transform duration-[800ms] ease-[cubic-bezier(0.2,1,0.3,1)]' : ''}`}
            style={{ 
              transform: `translateX(calc(50% - ${cardWidth / 2}px - ${activeIndex * totalCardWidth}px))` 
            }}
          >
            {extendedSkills.map((skill, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div key={idx} className="px-3">
                  <div className={`
                    flex-shrink-0 w-[300px] md:w-[380px] p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] transition-all duration-700
                    border-2 flex flex-col justify-between h-[380px] md:h-[420px] relative overflow-hidden
                    ${isActive 
                      ? (theme === 'dark' ? 'border-white bg-zinc-900 shadow-2xl' : 'border-zinc-950 bg-white shadow-2xl') 
                      : (theme === 'dark' ? 'border-white/10 bg-zinc-900/40 opacity-40 scale-90' : 'border-black/5 bg-zinc-50 opacity-40 scale-90')}
                  `}>
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-8 md:mb-10">
                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-current animate-pulse' : 'bg-transparent'}`} />
                      </div>
                      <h3 className="text-3xl md:text-5xl font-[1000] mb-4 md:mb-6 tracking-tighter leading-none">
                        {skill.name}
                      </h3>
                      <p className={`text-xs md:text-sm leading-relaxed font-medium transition-opacity duration-700 ${isActive ? 'opacity-60' : 'opacity-0'}`}>
                        {skill.description}
                      </p>
                    </div>
                    
                    <div className="w-full relative z-10 pt-6">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-[10px] font-black opacity-30 uppercase tracking-[0.2em]">Mastery</span>
                        <span className={`text-2xl md:text-3xl font-[1000] ${isActive ? 'scale-110' : 'opacity-0'}`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`h-2.5 w-full rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                        <div 
                          className={`h-full transition-all duration-[1500ms] delay-300 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-zinc-950'}`}
                          style={{ width: isActive ? `${skill.level}%` : '5%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 md:gap-5 mt-10 md:mt-12">
          {skillData.map((skill, i) => (
            <button
              key={i}
              onClick={() => { 
                setShouldAnimate(true);
                setActiveIndex(i + skillData.length); 
                setIsPaused(true); 
              }}
              className="group py-4 flex flex-col items-center"
            >
              <div className={`
                h-1.5 transition-all duration-700 rounded-full bg-current
                ${baseIndex === i ? 'w-10 md:w-16 opacity-100' : 'w-2 md:w-4 opacity-15'}
              `} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
