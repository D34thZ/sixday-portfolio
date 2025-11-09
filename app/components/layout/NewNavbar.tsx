// 📍 ที่อยู่ไฟล์: app/components/layout/NewNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
// (ลบ) Image
import { ThemeToggle } from './ThemeToggle'; // <-- (เพิ่ม) Import ThemeToggle

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

// TAG: [Request 3] (2)
// (ส่วน MobileMenuOverlay - เพิ่ม Dark Mode)
const MobileMenuOverlay = ({ items, onClose }: { items: any[], onClose: () => void }) => (
  <motion.div
    // (แก้) เพิ่ม Dark Mode ให้กับเมนู Overlay
    className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8
               bg-white dark:bg-slate-950" 
    initial={{ x: '-100%' }}
    animate={{ x: 0 }}
    exit={{ x: '-100%' }}
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
          // (แก้) เพิ่ม Dark Mode ให้กับ Link
          className="font-mono text-3xl text-slate-900 transition-colors hover:text-blue-600 font-bold
                     dark:text-slate-50 dark:hover:text-blue-400"
        >
          &lt;/{item.label}&gt;
        </Link>
      </motion.div>
    ))}
  </motion.div>
);

// TAG: [Request 1] (3)
// (ส่วน LanguageToggle คงเดิม)
const LanguageToggle = ({ textColor }: { textColor: string }) => {
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const getNewPath = (targetLocale: 'th' | 'en') => {
    return pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
  };

  return (
    <div className={`flex items-center gap-1 font-mono font-bold text-[17.6px] ${textColor}`}>
      <Link 
        href={getNewPath('th')}
        className={currentLocale === 'th' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
      >
        TH
      </Link>
      <span className="opacity-30">/</span>
      <Link 
        href={getNewPath('en')}
        className={currentLocale === 'en' ? 'opacity-100' : 'opacity-50 hover:opacity-100'}
      >
        EN
      </Link>
    </div>
  );
};

// * TAG: [Refactor-Logo-Removal] (1)
// * (ลบ) Component "Logo" ทั้งหมด

// * TAG: [Refactor-Flicker-Bug] (2)
// * (ส่วน MenuLinks คงเดิม)
const MenuLinks = ({ 
  navItems, 
  textColor, 
  hoveredItem, 
  setHoveredItem 
}: { 
  navItems: any[], 
  textColor: string, 
  hoveredItem: string | null, 
  setHoveredItem: (id: string | null) => void 
}) => (
  <nav
    className="flex justify-center items-center gap-10"
    onMouseLeave={() => setHoveredItem(null)}
  >
    {navItems.map((item) => {
      const before = item.label.slice(0, item.splitAt);
      const after = item.label.slice(item.splitAt);
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

// === Component หลัก ===

export function NewNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useParams();
  const locale = params.locale as string; 

  useEffect(() => {
    // * TAG: [Debug-Mount]
    // * เพิ่ม 'console.log' เพื่อเช็คว่า Navbar 'mount' สำเร็จหรือไม่
    console.log("✅ [Debug] NewNavbar Mounted (Scroll Effect)");

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // <-- 'useEffect' นี้มีอยู่แล้ว

  // (แก้) ต้องกำหนด locale ให้ navItems (ถ้ายังไม่ถูกกำหนด)
  const navItems = [
    { id: 'home', href: `/${locale}#home`, label: 'home', number: '01', splitAt: 3 },
    { id: 'expertise', href: `/${locale}#expertise`, label: 'expertise', number: '02', splitAt: 8 },
    { id: 'work', href: `/${locale}#work`, label: 'work', number: '03', splitAt: 3 },
    { id: 'experience', href: `/${locale}#experience`, label: 'experience', number: '04', splitAt: 9 },
    { id: 'contact', href: `/${locale}#contact`, label: 'contact', number: '05', splitAt: 6 },
  ];

  // TAG: [Render]
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-24"
    >
      
      {/* * TAG: [Background]
        * (แก้) เพิ่ม Dark Mode ให้กับพื้นหลัง
      */}
      <motion.div
        className="absolute inset-0 bg-white/90 backdrop-blur-md shadow-lg shadow-black/5
                   dark:bg-slate-950/90" // <-- (แก้)
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      
      {/* * TAG: [UI-Layer] */}
      <div className="relative z-50 pt-6 max-w-7xl mx-auto px-8 h-full grid grid-cols-3 items-center">
        
        {/* === Slot 1: ซ้าย === */}
        <div className="justify-self-start">
          
          {/* * TAG: [Theme-Toggle-Desktop]
            * (แก้) แสดง ThemeToggle ที่นี่สำหรับ Tablet (md) และ Desktop (lg)
          */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* * TAG: [Theme-Toggle-Mobile-Hamburger]
            * (แก้) แสดง Hamburger ที่นี่สำหรับ Mobile (< md)
          */}
          <div className="md:hidden">
            <HamburgerButton 
              isOpen={isMobileMenuOpen}
              toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              // (แก้) เพิ่มสีสำหรับ Dark Mode
              color="text-gray-900 dark:text-gray-100" 
            />
          </div>
        </div>

        {/* === Slot 2: กลาง === */}
        <div className="justify-self-center">
            {/* Desktop/Tablet: แสดงเมนู */}
            <div className="hidden md:flex">
              <MenuLinks 
                navItems={navItems}
                // (แก้) เพิ่มสีสำหรับ Dark Mode
                textColor="text-gray-900 dark:text-gray-100" 
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            </div>

            {/* * TAG: [Theme-Toggle-Mobile-Center]
              * (แก้) แสดง ThemeToggle ที่นี่สำหรับ Mobile (< md)
              * และต้อง หายไป (exit) เมื่อ isMobileMenuOpen == true
            */}
            <div className="md:hidden">
              <AnimatePresence>
                {!isMobileMenuOpen && (
                  <motion.div
                    initial={false} 
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    <ThemeToggle />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>

        {/* === Slot 3: ขวา === */}
        <div className="justify-self-end">
          {/* (แก้) เพิ่มสีสำหรับ Dark Mode */}
          <div className="hidden md:flex">
            <LanguageToggle textColor="text-gray-900 dark:text-gray-100" />
          </div>
          
          {/* (แก้) เพิ่มสีสำหรับ Dark Mode */}
          <div className="md:hidden">
            <AnimatePresence>
              {!isMobileMenuOpen && (
                <motion.div
                  initial={false}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  <LanguageToggle textColor="text-gray-900 dark:text-gray-100" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* * TAG: [Mobile-Overlay-Layer] */}
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