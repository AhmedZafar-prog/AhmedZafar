import React from 'react';
import { Theme } from '../types';

interface AboutProps {
  theme: Theme;
}

const About: React.FC<AboutProps> = ({ theme }) => {
  return (
    <section
      id="about"
      className="py-40 px-6 max-w-7xl mx-auto scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-[1000] mb-24 tracking-tighter uppercase leading-none">
          About Me
        </h2>

        <div className="space-y-10 text-xl md:text-2xl leading-relaxed opacity-80 font-light tracking-tight">
          <p>
            Hello! I'm Ahmed, a 17-year-old student with big dreams and a
            curious mindset. From childhood, I have been drawn toward building
            and experimenting — even lighting a bulb felt like a meaningful
            achievement because it helped me understand how things work.
          </p>
          <p>
            My interest in computer science began in 8th grade when I was
            introduced to practical programming. While many students were still
            adjusting to basic coding concepts, I found myself enjoying the
            logic and structure behind it.
          </p>
          <p>
            Alongside technical growth, I focus on discipline, leadership, and
            personal development. I value time deeply and believe that
            consistent effort and intentional growth are essential to building
            a meaningful future.
          </p>
        </div>

        {/* Empty flex container for future content */}
        <div className="mt-32 flex flex-col md:flex-row items-center gap-6"></div>
      </div>
    </section>
  );
};

export default About;
