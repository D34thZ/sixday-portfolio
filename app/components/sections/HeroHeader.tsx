// 📍 ที่อยู่ไฟล์: app/components/sections/HeroHeader.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeroHeader() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // ( ... โค้ด useEffect, Particle, animate ทั้งหมดของคุณ ... )
  // ( ... ผมย่อส่วนนี้ไว้เพื่อให้อ่านง่าย แต่คุณต้อง copy มาทั้งหมด ... )
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle system - สีอ่อนลงให้เข้ากับพื้นขาว
    class Particle {
      constructor() {
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
        this.x += this.vx;
        this.y += this.vy;
        this.life += 0.001;
        
        if (this.x < 0 || this.x > canvas.offsetWidth || 
            this.y < 0 || this.y > canvas.offsetHeight) {
          this.reset();
        }
      }
      
      draw() {
        const opacity = Math.sin(this.life) * 0.3 + 0.3;
        ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.4})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const particles = Array.from({ length: 60 }, () => new Particle());
    let animationId;
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Draw grid with perspective - สีเทาอ่อนมาก
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
      ctx.lineWidth = 0.5;
      
      const gridSize = 50;
      const perspectiveY = canvas.offsetHeight * 0.7;
      
      for (let i = 0; i < canvas.offsetWidth; i += gridSize) {
        ctx.beginPath();
        const offset = Math.sin(frame * 0.008 + i * 0.02) * 8;
        ctx.moveTo(i, 0);
        ctx.lineTo(i + offset, perspectiveY);
        ctx.stroke();
      }
      
      for (let i = 0; i < perspectiveY; i += gridSize) {
        ctx.beginPath();
        const waveOffset = Math.sin(frame * 0.015 + i * 0.01) * 15;
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.offsetWidth, i + waveOffset);
        ctx.stroke();
      }
      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      // Draw connections - เส้นเชื่อมบางและอ่อนมาก
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.08)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Mouse interaction - glow สีน้ำเงินอ่อน
      if (mousePos.x && mousePos.y) {
        const gradient = ctx.createRadialGradient(
          mousePos.x, mousePos.y, 0,
          mousePos.x, mousePos.y, 120
        );
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
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

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    // TAG: [Fix-Screen] (1)
    // นี่คือจุดที่แก้ไขตามคำขอของคุณ
    // ลบ 'h-screen' และ 'bg-white'
    // เปลี่ยนเป็น 'h-[80vh]' (สูง 80% ของจอ)
    // Canvas จะวาดลงบน Gradient ของ 'page.tsx' โดยตรง
    <header className="relative w-full h-[80vh] overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* ... โค้ดที่เหลือทั้งหมด (Overlays, Shapes, Content) ... */}
      {/* ... คัดลอกโค้ดส่วนที่เหลือของคุณมาวางที่นี่ ... */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-slate-50/40" />
      <div className="absolute top-32 right-32 w-96 h-96 border border-slate-200/40 rotate-45 animate-[spin_25s_linear_infinite]" />
      <div className="absolute bottom-24 left-24 w-64 h-64 border border-blue-200/30 rotate-12 animate-[spin_20s_linear_infinite_reverse]" />
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full blur-sm animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-slate-400/30 rounded-full blur-sm animate-[float_8s_ease-in-out_infinite_reverse]" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div className="relative mb-6">
          <h1 className="relative text-7xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 tracking-tight">
            SIXDAY
          </h1>
          <div className="absolute inset-0 text-7xl md:text-8xl lg:text-9xl font-black text-blue-500/5 blur-2xl">
            SIXDAY
          </div>
        </div>
        <div className="space-y-5 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-800 tracking-tight">
            Full-Stack Software Engineer
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
            Architecting scalable solutions with cutting-edge technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-8">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'AI/ML'].map((tech, i) => (
              <span
                key={tech}
                className="px-5 py-2.5 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-full text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-default"
                style={{ 
                   animationDelay: `${i * 100}ms`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col sm:flex-row gap-4">
          <button className="group relative px-8 py-4 bg-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30">
            <span className="relative z-10">View Projects</span>
          </button>
          <button className="px-8 py-4 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            Contact Me
          </button>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-slate-400 rounded-full animate-[scroll_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
             transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% { 
             transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
      `}</style>
    </header>
  );
}