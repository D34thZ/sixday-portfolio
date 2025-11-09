// 📍 ที่อยู่ไฟล์: app/components/layout/NewNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
// 1. "เพิ่ม" import 'Image'
import Image from 'next/image';

// TAG: [Mobile-Nav] (1)
// (ส่วน HamburgerButton คงเดิม)
const HamburgerButton = ({ isOpen, toggle, color }: { isOpen: boolean, toggle: () => void, color: string }) => (
  <motion.button
    onClick={toggle}
    className={`relative z-50 h-8 w-8 ${color} transition-colors`}
    animate={isOpen ? "open" : "closed"}
    aria-label="Toggle menu"
  >
    <motion.span
      style={{ left: '50%', top: '35%', x: '-50%', y: '-50%' }}
      className="absolute h-0.5 w-6 bg-current"
      variants={{
        open: { rotate: 45, top: '50%' },
        closed: { rotate: 0, top: '35%' }
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    />
    <motion.span
      style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
      className="absolute h-0.5 w-6 bg-current"
      variants={{
        open: { opacity: 0 },
        closed: { opacity: 1 }
      }}
      transition={{ duration: 0.1 }}
    />
    <motion.span
      style={{ left: '50%', top: '65%', x: '-50%', y: '-50%' }}
      className="absolute h-0.5 w-6 bg-current"
      variants={{
        open: { rotate: -45, top: '50%' },
        closed: { rotate: 0, top: '65%' }
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    />
  </motion.button>
);

// TAG: [Mobile-Nav] (2)
// (ส่วน MobileMenuOverlay คงเดิม)
const MobileMenuOverlay = ({ items, onClose }: { items: any[], onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8
               bg-white" 
    initial={{ x: '100%' }}
    animate={{ x: 0 }}
    exit={{ x: '100%' }}
    transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
  >
    {items.map((item, index) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.2 + index * 0.1 }}
      >
        <Link
          href={item.href}
          onClick={onClose} 
          className="font-mono text-3xl text-slate-900 transition-colors hover:text-blue-600 font-bold"
        >
          &lt;/{item.label}&gt;
        </Link>
      </motion.div>
    ))}
  </motion.div>
);


export function NewNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // TAG: [Mobile-Nav] (3)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const params = useParams();
  const locale = params.locale as string; 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', href: `/${locale}#home`, label: 'home', number: '01', splitAt: 3 },
    { id: 'expertise', href: `/${locale}#expertise`, label: 'expertise', number: '02', splitAt: 8 },
    { id: 'work', href: `/${locale}#work`, label: 'work', number: '03', splitAt: 3 },
    { id: 'experience', href: `/${locale}#experience`, label: 'experience', number: '04', splitAt: 9 },
    { id: 'contact', href: `/${locale}#contact`, label: 'contact', number: '05', splitAt: 6 },
  ];

  // (ส่วน MenuLinks)
  const MenuLinks = ({ className, textColor }: { className?: string, textColor: string }) => (
    <nav
      className={`flex justify-center items-center gap-10 ${className}`}
      onMouseLeave={() => setHoveredItem(null)}
    >
      {navItems.map((item) => {
        // TAG: [Fix-Text-Glitch] (1)
        // นี่คือจุด "ซ่อม" ครับ
        const before = item.label.slice(0, item.splitAt);
        const after = item.label.slice(item.splitAt); // <--- แก้ไขแล้ว
        
        const isHovered = hoveredItem === item.id;
        const isOtherHovered = hoveredItem !== null && !isHovered;

        return (
          <Link
            key={item.id}
            href={item.href}
            onMouseEnter={() => setHoveredItem(item.id)}
            className={`
              relative transition-all duration-300 ease-out font-mono tracking-wide font-bold
              text-[17.6px] 
              ${textColor}
              ${isHovered ? 'opacity-100' : ''} 
              ${isOtherHovered ? 'opacity-50' : ''}
            `}
          >
            &lt;/{before}
            <span className="relative">
              <span className={`
                absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] 
                transition-opacity duration-300 ease-out
                ${isHovered ? 'opacity-100' : 'opacity-60'}
                ${isOtherHovered ? 'opacity-30' : ''}
              `}>
                {item.number}
              </span>
            </span>
            {after}&gt;
          </Link>
        );
      })}
    </nav>
  );

  // TAG: [Render] (8)
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-24"
    >
      <AnimatePresence initial={false}>
        {/*
          TAG: [Navbar-1] (โปร่งใส) 
        */
        !scrolled && (
          <motion.div
            key="nav1"
            className="absolute inset-0 pt-10" 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* TAG: [Fix-Logo-Layout] (1) */}
            <div className="relative max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
              
              {/* (Slot 1) โลโก้ (ซ้าย) */}
              <Link href={`/${locale}#home`} className="flex items-center gap-3">
                
                {/* TAG: [Logo-Update] (2) */}
                <Image
                  src="/images/Gemini_Generated_Image_45bpjp45bpjp45bp.png"
                  width={52}
                  height={52}
                  alt="Sixday.dev Logo"
                  className="rounded-full" // ทำให้เป็นวงกลม
                />

                {/* ข้อความโลโก้ */}
                <span className="text-gray-900 text-3xl font-bold">
                  Sixday._
                </span>
              </Link>

              {/* (Slot 2) เมนู Desktop (กลาง) */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <MenuLinks textColor="text-gray-900" />
              </div>

              {/* (Slot 3) ปุ่ม Mobile (ขวา) */}
              <div className="md:hidden">
                <HamburgerButton 
                  isOpen={isMobileMenuOpen}
                  toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  color="text-gray-900"
                />
              </div>

            </div>
          </motion.div>
        )}

        {/*
          TAG: [Navbar-2] (ขาวเบลอ) 
        */
        scrolled && (
          <motion.div
            key="nav2"
            className="absolute inset-0 pt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div 
              className="absolute inset-0 bg-white/90 backdrop-blur-md -z-10 shadow-lg shadow-black/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* TAG: [Fix-Logo-Layout] (2) */}
            <div className="relative max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
              
              {/* (Slot 1) โลโก้ (ซ้าย) */}
              <Link href={`/${locale}#home`} className="flex items-center gap-3">
                
                {/* TAG: [Logo-Update] (3) */}
                <Image
                  src="/images/Gemini_Generated_Image_45bpjp45bpjp45bp.png"
                  width={52}
                  height={52}
                  alt="Sixday.dev Logo"
                  className="rounded-full" // ทำให้เป็นวงกลม
                />
                
                <span className="text-gray-900 text-3xl font-bold">
                  Sixday._
                </span>
              </Link>

              {/* (Slot 2) เมนู Desktop (กลาง) */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <MenuLinks textColor="text-gray-900" />
              </div>

              {/* (Slot 3) ปุ่ม Mobile (ขวา) */}
              <div className="md:hidden">
                <HamburgerButton 
                  isOpen={isMobileMenuOpen}
                  toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  color="text-gray-900"
                />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuOverlay 
            items={navItems} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}