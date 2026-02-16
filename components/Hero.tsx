
import React, { useEffect, useState, useRef } from 'react';
import { Theme } from '../types';

interface HeroProps {
  theme: Theme;
}

const InteractiveMesh: React.FC<{ theme: Theme }> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let grid: Node[][] = [];
    const mouse = { x: -1000, y: -1000 };
    
    // Grid configuration
    const spacing = 55; // Slightly wider spacing for triangular pattern
    const mouseRadius = 350;
    const mouseStrength = 0.5;
    const friction = 0.94;
    const spring = 0.04;

    class Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number = 0;
      vy: number = 0;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - dist) / mouseRadius;
          const tx = this.x - Math.cos(angle) * force * mouseRadius * mouseStrength;
          const ty = this.y - Math.sin(angle) * force * mouseRadius * mouseStrength;
          
          this.vx += (tx - this.x) * 0.06;
          this.vy += (ty - this.y) * 0.06;
        }

        // Return to base position
        const dxBase = this.baseX - this.x;
        const dyBase = this.baseY - this.y;
        this.vx += dxBase * spring;
        this.vy += dyBase * spring;

        this.vx *= friction;
        this.vy *= friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const cols = Math.ceil(canvas.width / spacing) + 2;
      const rows = Math.ceil(canvas.height / spacing) + 2;
      
      grid = [];
      for (let y = 0; y < rows; y++) {
        const row: Node[] = [];
        for (let x = 0; x < cols; x++) {
          row.push(new Node(x * spacing - spacing/2, y * spacing - spacing/2));
        }
        grid.push(row);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Significantly increased alpha for light mode visibility
      const lineAlpha = theme === 'dark' ? 0.09 : 0.18; 
      const pointAlpha = theme === 'dark' ? 0.25 : 0.45;
      const color = theme === 'dark' ? '255, 255, 255' : '20, 20, 25'; // Deeper gray for light mode lines

      ctx.lineWidth = 0.7;

      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          const node = grid[y][x];
          node.update();

          // Connection function for cleaner logic
          const drawLine = (n1: Node, n2: Node, alphaMult = 1) => {
            const dist = Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2));
            const localAlpha = Math.max(lineAlpha * 0.4, lineAlpha * (1 + (spacing * 1.5 - dist) / (spacing * 1.5))) * alphaMult;
            ctx.strokeStyle = `rgba(${color}, ${localAlpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          };

          // 1. Horizontal connection
          if (x < grid[y].length - 1) {
            drawLine(node, grid[y][x+1]);
          }

          // 2. Vertical connection
          if (y < grid.length - 1) {
            drawLine(node, grid[y+1][x]);
          }

          // 3. Diagonal connection (The "Triangulation" - breaks the square look)
          if (x < grid[y].length - 1 && y < grid.length - 1) {
            drawLine(node, grid[y+1][x+1], 0.6); // Slightly lighter diagonal
          }

          // Draw node point (Diamond shape for technical look)
          const pAlpha = Math.max(0.1, pointAlpha * (1 - (Math.abs(node.vx) + Math.abs(node.vy)) / 10));
          ctx.fillStyle = `rgba(${color}, ${pAlpha})`;
          
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(Math.PI / 4); // Rotate 45 deg for diamond
          ctx.fillRect(-1, -1, 2, 2);
          ctx.restore();
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', init);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-90" />;
};

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const buttonBaseClasses = "px-14 py-5 rounded-full font-black tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95 shadow-2xl";
  const buttonThemeClasses = theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white';

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <InteractiveMesh theme={theme} />
      
      <div className="z-10 text-center select-none pointer-events-none">
        
        <h1 className="text-8xl md:text-[14rem] font-[1000] leading-[0.78] tracking-[-0.05em] flex flex-col items-center">
          <span className={`block transition-colors duration-700 ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>
            AHMED 
          </span>
          <span className={`block transition-colors duration-700 ${theme === 'dark' ? 'text-white' : 'text-zinc-950'}`}>
            ZAFAR
          </span>
        </h1>

        <div className="mt-16 flex flex-col items-center pointer-events-auto">
         <p className="text-xs md:text-sm tracking-[0.6em] uppercase mb-10 opacity-40 animate-pulse font-black">
          Student & Aspiring Learner
        </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a 
              href="#work" 
              onClick={(e) => {
                  e.preventDefault();
                  scrollTo('work');
              }}
              className={`${buttonBaseClasses} ${buttonThemeClasses}`}
            >
              PROJECTS
            </a>
            
            <a 
              href="#contact" 
              onClick={(e) => {
                  e.preventDefault();
                  scrollTo('contact');
              }}
              className={`${buttonBaseClasses} ${buttonThemeClasses}`}
            >
              CONTACT ME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
