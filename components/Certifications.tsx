
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Theme, CertificationItem } from '../types';

interface CertificationsProps { theme: Theme; }

const certificationsData: CertificationItem[] = [
  {
    title: "Meritorious Awards",
    issuer: "Habib University",
    date: "2026",
    image: "/assets/certificates/meritorious.png",
    description: "Selected and invited to attend the Meritorious Awards ceremony hosted by Habib University, honoring high-performing students from top colleges for exceptional academic achievement."
  },
  {
    title: "International Computer Science Competition",
    issuer: "icsc",
    date: "2025",
    image: "/assets/certificates/icsc.jpeg",
    description: "Participated in an international-level computer science competition focused on algorithmic thinking and advanced problem-solving. Successfully qualified for the pre-final round and received a Certificate of Participation."
  },
  {
    title: "Open Day - 2025",
    issuer: "Enrichment Habib",
    date: "2025",
    image: "/assets/certificates/openday.png",
    description: "Recognized for leadership and social impact during Open Day 2025 by organizing a sustainability stall and distributing 20–25 baby plants connected with Tree Of Hope , to families, encouraging environmental responsibility within the community."
  },
  {
    title: "The Duke of Edinburgh's International Award",
    issuer: "Duke of Edinburgh",
    date: "2023",
    image: "/assets/certificates/duke.png",
    description: "Completed a trekking expedition at Mubarak Village involving mountain hiking and an overnight camp as part of the Award program. The activity concluded with a beach clean-up drive at Karachi Sea View, demonstrating endurance, teamwork, and environmental responsibility."
  },
  {
    title: "Cardboard F1 Racing Console",
    issuer: "Habib public school",
    date: "2022",
    image: "/assets/certificates/f1-car.png",
    description: "Developed an interactive F1 racing console entirely from cardboard, simulating a rotating track and requiring precise control to prevent the car from getting crashed. Recognized among the top five STEM projects of the event for innovation and Creativity"
  },
  {
    title: "Urdu Fahmi Competition",
    issuer: "Habib public high school",
    date: "2025",
    image: "/assets/certificates/urdufahmi.png",
    description: "Awarded 1st place in a team-based Urdu competition featuring poetry, listening, writing, and Q&A challenges. Recognized for excellent teamwork and language proficiency.",

  },
  {
    title: "SST - Interschool Compeitition",
    issuer: "SST - rashidabad",
    date: "2022",
    image: "/assets/certificates/sst-interschool.png",
    description: "Represented my school in the IT quiz segment of the SST Public Inter-School Competition, demonstrating technical knowledge and problem-solving skills. Received a certificate of participation."
  },
  {
    title: "International Kangroo Linguistic Competition",
    issuer: "IKLC",
    date: "2021",
    image: "/assets/certificates/kangroo2021.png",
    description: "Participated in the IKLC 2021 competition and achieved the 1-Star Credit Level"
  },
];

interface CardProps {
  item: CertificationItem;
  index: number;
  theme: Theme;
  onThrow: () => void;
  onOpen: () => void;
}


const Card: React.FC<CardProps> = ({ 
  item, 
  index, 
  theme, 
  onThrow,
  onOpen
}) => {

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateValue = useTransform(x, [-200, 200], [-15, 15]);
  const opacityValue = useTransform(x, [-250, -150, 0, 150, 250], [0, 1, 1, 1, 0]);

  const isTop = index === 0;

  const layerStyles = {
    0: { x: 0, y: 0, z: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 50 },
    1: { x: 40, y: 15, z: -40, scale: 0.95, rotate: 3, opacity: 0.8, zIndex: 40 },
    2: { x: 80, y: 30, z: -80, scale: 0.90, rotate: 6, opacity: 0.5, zIndex: 30 },
  };

  const currentLayer = (layerStyles as any)[index] || { x: 120, y: 45, z: -120, scale: 0.85, rotate: 9, opacity: 0, zIndex: 10 };

  return (
    <motion.div
     onClick={isTop ? onOpen : undefined}

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
        if (Math.abs(info.velocity.x) > 300 || Math.abs(info.offset.x) > 100) {
          onThrow();
        }
      }}
      animate={{
        x: isTop ? x.get() : currentLayer.x,
        y: isTop ? y.get() : currentLayer.y,
        z: currentLayer.z,
        scale: currentLayer.scale,
        transition: { type: "spring", stiffness: 350, damping: 35 }
      }}
      whileTap={isTop ? { scale: 1.01 } : {}}
      className={`absolute w-[280px] sm:w-[450px] md:w-[600px] aspect-[16/14] rounded-2xl overflow-hidden shadow-lg border-2 cursor-grab active:cursor-grabbing select-none transition-shadow
        ${theme === 'dark' ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5'}
      `}
    >
      <div className="w-full h-full relative group">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover pointer-events-none"
          onError={(e) => {
            e.currentTarget.src = `https://picsum.photos/1200/800?random=${item.title.length}`;
          }}
        />
        
        {/* Professional Floating Badge Title - Enhanced Contrast */}
        

        {/* Sleek Overlay for Swipe Hint */}
        {isTop && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none flex items-end p-8">
            
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Certifications: React.FC<CertificationsProps> = ({ theme }) => {
  const [deck, setDeck] = useState(certificationsData);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleThrow = () => {
    setDeck(prev => {
      const newDeck = [...prev];
      const item = newDeck.shift();
      if (item) newDeck.push(item);
      return newDeck;
    });
  };

  const currentCert = deck[0];

  return (
    <section id="certifications" className={`py-40 overflow-hidden scroll-mt-24 relative ${theme === 'dark' ? 'bg-black' : 'bg-zinc-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12 relative z-10">
        <h2 className="text-3xl sm:text-6xl md:text-9xl font-[1000] mb-6 tracking-tighter uppercase leading-none break-words">
         Certifications
        </h2>
      </div>

      <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full flex items-center justify-center perspective-[2000px] z-20">
        <div className="relative w-[280px] sm:w-[450px] md:w-[600px] h-full flex items-center justify-center">
          <AnimatePresence initial={false}>
            {deck.map((cert, idx) => {
               if (idx > 2) return null;
               return (
                <Card 
  key={cert.title} 
  item={cert} 
  index={idx} 
  theme={theme}
  onThrow={handleThrow}
  onOpen={() => setSelectedImage(cert.image)}
/>


              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Dynamic Detail Box Beneath the Cards */}
      <div className="mt-12 md:mt-16 max-w-2xl mx-auto px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCert.title}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className={`p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-2 shadow-xl ${
              theme === 'dark' ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 block mb-2">Verified Achievement</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-[1000] tracking-tight">{currentCert.title}</h3>
              </div>
              <div className="text-right flex flex-col items-start md:items-end">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 block mb-2">Issued By</span>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest opacity-60">{currentCert.issuer}</p>
              </div>
            </div>

            <div className={`w-full h-[1px] mb-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />

            <div className="space-y-6">
              <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed opacity-70 italic">
                "{currentCert.description || 'No detailed description available for this certification.'}"
              </p>
              
              <div className="flex justify-between items-center pt-4">
                <div className="flex gap-2">
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'}`}>
                    {currentCert.date}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex justify-center items-center gap-2 relative z-10">
        {certificationsData.map((cert, i) => {
          const isActive = deck[0].title === cert.title;
          return (
            <button 
              key={i} 
              className={`h-1.5 transition-all duration-700 rounded-full bg-current ${isActive ? 'w-12 sm:w-16 opacity-100' : 'w-2 opacity-10'}`} 
            />
          );
        })}
      </div>
      <AnimatePresence>
  {selectedImage && (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedImage(null)}
    >
      <motion.img
        src={selectedImage}
        className="max-w-[95%] max-h-[95%] rounded-xl shadow-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
};

export default Certifications;
