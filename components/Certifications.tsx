
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Theme, CertificationItem } from '../types';

interface CertificationsProps { theme: Theme; }

const certificationsData: CertificationItem[] = [
  {
    title: "Python for Everybody",
    issuer: "Coursera / UMich",
    date: "2023",
    image: "/assets/certs/python.jpg",
    link: "#"
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    image: "/assets/certs/responsive-web.jpg",
    link: "#"
  },
  {
    title: "Google IT Support Professional",
    issuer: "Google",
    date: "2024",
    image: "/assets/certs/google-it.jpg",
    link: "#"
  },
  {
    title: "Cisco Networking Basics",
    issuer: "Cisco Academy",
    date: "2024",
    image: "/assets/certs/cisco-networking.jpg",
    link: "#"
  },
  {
    title: "AI Fundamentals",
    issuer: "Microsoft",
    date: "2024",
    image: "/assets/certs/ai-fundamentals.jpg",
    link: "#"
  },
  {
    title: "Cybersecurity Essentials",
    issuer: "Cisco Networking Academy",
    date: "2023",
    image: "/assets/certs/cyber-essentials.jpg",
    link: "#"
  },
  {
    title: "IBM Data Science",
    issuer: "IBM / Coursera",
    date: "2024",
    image: "/assets/certs/ibm-data-science.jpg",
    link: "#"
  },
  {
    title: "Cloud Practitioner",
    issuer: "AWS",
    date: "2024",
    image: "/assets/certs/aws-cloud.jpg",
    link: "#"
  },
  {
    title: "Meta Front-End Dev",
    issuer: "Meta / Coursera",
    date: "2023",
    image: "/assets/certs/meta-frontend.jpg",
    link: "#"
  },
  {
    title: "JavaScript Algos",
    issuer: "freeCodeCamp",
    date: "2023",
    image: "/assets/certs/js-algorithms.jpg",
    link: "#"
  },
  {
    title: "Foundations of UX",
    issuer: "Google",
    date: "2024",
    image: "/assets/certs/google-ux.jpg",
    link: "#"
  },
  {
    title: "Deep Learning Spec.",
    issuer: "DeepLearning.AI",
    date: "2024",
    image: "/assets/certs/deep-learning.jpg",
    link: "#"
  }
];

interface CardProps {
  item: CertificationItem;
  index: number;
  theme: Theme;
  onThrow: () => void;
}

const Card: React.FC<CardProps> = ({ 
  item, 
  index, 
  theme, 
  onThrow 
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateValue = useTransform(x, [-150, 150], [-20, 20]);
  const opacityValue = useTransform(x, [-180, -120, 0, 120, 180], [0, 1, 1, 1, 0]);

  const isTop = index === 0;

  const layerStyles = {
    0: { x: 0, y: 0, z: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 50 },
    1: { x: -25, y: 15, z: -40, scale: 0.97, rotate: -2, opacity: 0.9, zIndex: 40 },
    2: { x: 25, y: 30, z: -80, scale: 0.94, rotate: 2, opacity: 0.7, zIndex: 30 },
    3: { x: -15, y: 45, z: -120, scale: 0.91, rotate: -1, opacity: 0.4, zIndex: 20 },
  };

  const currentLayer = (layerStyles as any)[index] || { x: 0, y: 60, z: -160, scale: 0.88, rotate: 0, opacity: 0, zIndex: 10 };

  return (
    <motion.div
      style={{ 
        x: isTop ? x : currentLayer.x,
        y: isTop ? y : currentLayer.y,
        rotate: isTop ? rotateValue : currentLayer.rotate,
        opacity: isTop ? opacityValue : currentLayer.opacity,
        zIndex: currentLayer.zIndex,
        transformStyle: "preserve-3d",
      }}
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(_, info) => {
        if (Math.abs(info.velocity.x) > 400 || Math.abs(info.offset.x) > 80) {
          onThrow();
        }
      }}
      animate={{
        x: isTop ? x.get() : currentLayer.x,
        y: isTop ? y.get() : currentLayer.y,
        z: currentLayer.z,
        scale: currentLayer.scale,
        transition: { type: "spring", stiffness: 400, damping: 40 }
      }}
      whileTap={isTop ? { scale: 1.01, z: 30 } : {}}
      className={`absolute w-[300px] md:w-[425px] aspect-[4/5.5] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] border-2 cursor-grab active:cursor-grabbing select-none transition-shadow
        ${theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5'}
      `}
    >
      <div className="w-full h-[75%] overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover pointer-events-none transition-transform duration-700 hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/600/800?random=${item.title.length}`;
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-zinc-900' : 'from-white'} via-transparent to-transparent opacity-60`} />
      </div>

      <div className="w-full h-[25%] px-5 py-4 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[7px] font-black uppercase tracking-[0.2em] opacity-40 truncate">{item.issuer}</span>
          <div className="h-px flex-grow bg-current opacity-10" />
        </div>
        <h3 className="text-sm md:text-base font-[900] tracking-tighter leading-tight line-clamp-2 mb-2">
          {item.title}
        </h3>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-[10px] font-bold opacity-40">{item.date}</span>
          <div className={`text-[8px] font-black uppercase tracking-widest opacity-20`}>Credential • ID</div>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications: React.FC<CertificationsProps> = ({ theme }) => {
  const [deck, setDeck] = useState(certificationsData);

  const handleThrow = () => {
    setDeck(prev => {
      const newDeck = [...prev];
      const item = newDeck.shift();
      if (item) newDeck.push(item);
      return newDeck;
    });
  };

  return (
    <section id="certifications" className={`py-32 overflow-hidden scroll-mt-24 relative ${theme === 'dark' ? 'bg-black' : 'bg-zinc-50'}`}>
      

      <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col items-center text-center">
        <h2 className="text-6xl md:text-9xl font-[1000] mb-8 tracking-tighter uppercase leading-none">
         Certifications
        </h2>
      </div>


      <div className="relative h-[380px] md:h-[500px] w-full flex items-center justify-center perspective-[1500px] z-10">
        <AnimatePresence initial={false}>
          {deck.map((cert, idx) => {
             if (idx > 3) return null;
             return (
              <Card 
                key={cert.title} 
                item={cert} 
                index={idx} 
                theme={theme}
                onThrow={handleThrow}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex justify-center items-center gap-1.5 relative z-10">
        {certificationsData.map((cert, i) => {
          const isActive = deck[0].title === cert.title;
          return (
            <div 
              key={i} 
              className={`h-1 transition-all duration-700 rounded-full ${isActive ? 'w-8 md:w-12 bg-current' : 'w-1.5 bg-current opacity-10'}`} 
            />
          );
        })}
      </div>
    </section>
  );
};

export default Certifications;
