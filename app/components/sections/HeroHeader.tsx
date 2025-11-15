// 📍 ที่อยู่ไฟล์: app/components/sections/HeroHeader.tsx
'use client';

// TAG: [THE-FIX] (1/2) Import 'HTMLCanvasElement' Type
import React, { useEffect, useRef, useState } from 'react';

// * TAG: [i18n-FIX] (3/6)
// * อัปเดต Interface ให้รองรับ 'buttons'
interface HeroHeaderProps {
  t: {
    subtitle: string;
    description: string;
    buttons: {
      projects: string;
      contact: string;
    };
  };
}

export default function HeroHeader({ t }: HeroHeaderProps) {
  // TAG: [THE-FIX] (2/2) 📍📍📍 นี่คือจุดที่แก้ไข 📍📍📍
  // เราบอก TypeScript ว่า Ref นี้ จะเก็บ <HTMLCanvasElement>
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // (โค้ด Canvas ทั้งหมดคงเดิม)
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // (บรรทัด 28) ตอนนี้ TypeScript เข้าใจแล้วว่า 'canvas' คือ HTMLCanvasElement
    // 'getContext' จึงไม่ใช่ Error อีกต่อไป
    const ctx = canvas.getContext('2d');

    // (เพิ่ม Safety Check สำหรับ ctx)
    if (!ctx) return; 

    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number; life: number;
      constructor() {
        this.x = 0; this.y = 0; this.vx = 0; this.vy = 0; this.size = 0; this.life = 0;
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.life = Math.random();
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.life += 0.001;
        if (this.x < 0 || this.x > canvas.offsetWidth || this.y < 0 || this.y > canvas.offsetHeight) {
          this.reset();
        }
      }
      draw() {
        if (!ctx) return;
        const isDark = document.documentElement.classList.contains('dark');
        const particleColor = isDark ? 'rgba(147, 197, 253, 0.4)' : 'rgba(59, 130, 246, 0.4)'; 
        const opacity = Math.sin(this.life) * 0.3 + 0.3;
        ctx.fillStyle = particleColor.replace('0.4', `${opacity * 0.4}`);
        ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
      }
    }
    const particles = Array.from({ length: 60 }, () => new Particle());
    let animationId: number;
    let frame = 0;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const isDark = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDark ? 'rgba(51, 65, 85, 0.2)' : 'rgba(148, 163, 184, 0.15)'; 
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      const perspectiveY = canvas.offsetHeight * 0.7;
      for (let i = 0; i < canvas.offsetWidth; i += gridSize) {
        ctx.beginPath();
        const offset = Math.sin(frame * 0.008 + i * 0.02) * 8;
        ctx.moveTo(i, 0); ctx.lineTo(i + offset, perspectiveY); ctx.stroke();
      }
      for (let i = 0; i < perspectiveY; i += gridSize) {
        ctx.beginPath();
        const waveOffset = Math.sin(frame * 0.015 + i * 0.01) * 15;
        ctx.moveTo(0, i); ctx.lineTo(canvas.offsetWidth, i + waveOffset); ctx.stroke();
      }
      particles.forEach(p => { p.update(); p.draw(); });
      ctx.strokeStyle = isDark ? 'rgba(147, 197, 253, 0.1)' : 'rgba(59, 130, 246, 0.08)'; 
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }
      if (mousePos.x && mousePos.y) {
        const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 120);
        const glowColor = isDark ? 'rgba(147, 197, 253, 0.1)' : 'rgba(59, 130, 246, 0.08)';
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, glowColor.replace('0.1', '0').replace('0.08', '0'));
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      }
      frame++;
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <header id="home" className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef} // (เราไม่จำเป็นต้อง Cast ที่นี่ เพราะเราแก้ที่ 'useRef' ต้นทางแล้ว)
        onMouseMove={handleMouseMove}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-slate-50/40 dark:from-blue-900/10 dark:to-slate-950/30" />
      <div className="absolute top-32 right-32 w-96 h-96 border border-slate-200/40 rotate-45 animate-[spin_25s_linear_infinite] dark:border-slate-800/40" />
      <div className="absolute bottom-24 left-24 w-64 h-64 border border-blue-200/30 rotate-12 animate-[spin_20s_linear_infinite_reverse] dark:border-blue-900/30" />
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full blur-sm animate-[float_6s_ease-in-out_infinite] dark:bg-blue-300/40" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-slate-400/30 rounded-full blur-sm animate-[float_8s_ease-in-out_infinite_reverse] dark:bg-slate-600/30" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="relative mb-6">
          <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-white tracking-tight">
            SIXDAY
          </h1>
          <div className="absolute inset-0 text-7xl md:text-8xl lg:text-9xl font-black text-blue-500/5 dark:text-blue-400/10 blur-2xl">
            SIXDAY
          </div>
        </div>
        <div className="space-y-5 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
            {t.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
            {t.description}
          </p> 
          <div className="flex flex-wrap justify-center gap-3 pt-8">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'AI/ML'].map((tech, i) => (
              <span
                key={tech}
                className="px-5 py-2.5 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-full text-slate-700 dark:bg-slate-800/80 dark:border-slate-700/60 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:bg-slate-700 dark:hover:border-slate-600 dark:hover:shadow-blue-400/10 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${i * 100}ms`, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col sm:flex-row gap-4">
          
          {/* * TAG: [i18n-FIX] (4A/6) */}
          <a 
            href="#work" 
            className="group relative px-8 py-4 bg-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 dark:shadow-blue-400/20"
          >
            <span className="relative z-10">{t.buttons.projects}</span>
          </a>
          
          {/* * TAG: [i18n-FIX] (4B/6) */}
          <a 
            href="#contact" 
            className="px-8 py-4 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg dark:hover:bg-slate-700 dark:hover:border-slate-600 dark:hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            {t.buttons.contact}
          </a>
        </div>
        <div className="relative mt-12 mx-auto animate-bounce sm:absolute sm:bottom-12 sm:left-1/2 sm:-translate-x-1-2 sm:mt-0 sm:mx-0">
          <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-700 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full animate-[scroll_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translateY(0) translateX(0); } 25% { transform: translateY(-20px) translateX(10px); } 50% { transform: translateY(-10px) translateX(-10px); } 75% { transform: translateY(-15px) translateX(5px); } }
        @keyframes scroll { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
      `}</style>
    </header>
  );
}