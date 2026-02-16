
import React from 'react';
import { Theme, EducationItem } from '../types';

interface EducationProps {
  theme: Theme;
}

const educationData: EducationItem[] = [
  {
    institution: "Habib Public High School",
    degree: "Higher Secondary Certificate (HSC)",
    period: "2024 - 2026",
    description: "Currently pursuing higher secondary education in Computer science with a focus on advanced academic excellence and preparing for future specialization in technology."
  },
  {
    institution: "Habib Public School",
    degree: "Secondary School Certificate (Matriculation)",
    period: "2022 - 2024",
    description: "Successfully completed secondary education in   Computer science with a distinguished score of 85% in the Secondary School Certificate (SSC) examinations."
  }
];

const Education: React.FC<EducationProps> = ({ theme }) => {
  return (
    <section id="education" className={`py-32 scroll-mt-24 ${theme === 'dark' ? 'bg-zinc-900/30' : 'bg-zinc-100/50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl md:text-8xl font-[1000] mb-24 tracking-tighter uppercase leading-none text-center">
          Education
        </h2>
        <div className="relative border-l-2 border-current border-opacity-10 ml-4 md:ml-0 md:mx-auto max-w-4xl pl-8 space-y-20">
          {educationData.map((item, idx) => (
            <div key={idx} className="relative">
              <div className={`absolute -left-10 top-0 w-4 h-4 rounded-full border-2 border-current ${theme === 'dark' ? 'bg-black' : 'bg-white'}`} />
              <span className="text-sm font-bold opacity-50 block mb-2">{item.period}</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.degree}</h3>
              <p className="text-lg font-medium opacity-70 mb-4">{item.institution}</p>
              <p className="max-w-2xl text-lg font-light leading-relaxed opacity-60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
