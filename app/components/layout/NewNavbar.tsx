// 📍 ที่อยู่ไฟล์: app/components/layout/NewNavbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

// (HamburgerButton คงเดิม)
const HamburgerButton = ({ isOpen, toggle, color }: { isOpen: boolean, toggle: () => void, color: string }) => (
  <motion.button
    onClick={toggle}
    className={`relative z-50 h-8 w-8 ${color} transition-colors`}
    animate={isOpen ? "open" : "closed"}
    aria-label="Toggle menu"
  >
    <motion.span style={{ left: '50%', top: '35%', x: '-50%', y: '-50%' }} className="absolute h-0.5 w-6 bg-current" variants={{ open: { rotate: 45, top: '50%' }, closed: { rotate: 0, top: '35%' } }} transition={{ duration: 0.3, ease: 'easeInOut' }} />
    <motion.span style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }} className="absolute h-0.5 w-6 bg-current" variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }} transition={{ duration: 0.1 }} />
    <motion.span style={{ left: '50%', top: '65%', x: '-50%', y: '-50%' }} className="absolute h-0.5 w-6 bg-current" variants={{ open: { rotate: -45, top: '50%' }, closed: { rotate: 0, top: '65%' } }} transition={{ duration: 0.3, ease: 'easeInOut' }} />
  </motion.button>
);

// TAG: [THE-FIX] (1/6) สร้าง Type สำหรับ Mobile Nav Item
interface MobileNavItem {
  id: string;
  href: string;
  label: string;
  number: string;
  locale: string;
}

// * TAG: [i18n-FIX] (5/6)
// * อัปเดต MobileMenuOverlay ให้รองรับ 2 ภาษา
// TAG: [THE-FIX] (2/6) ใช้ Type 'MobileNavItem[]' แทน 'any[]'
const MobileMenuOverlay = ({ items, onClose }: { items: MobileNavItem[], onClose: () => void }) => (
  <motion.div
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
          className="font-mono text-3xl text-slate-900 transition-colors hover:text-blue-600 font-bold
                     dark:text-slate-50 dark:hover:text-blue-400"
        >
          {/* (เพิ่ม) ถ้าเป็นอังกฤษ ให้แสดง < / ... > */}
          {item.locale === 'en' ? (
            <>&lt;/{item.label}&gt;</>
          ) : (
            // (เพิ่ม) ถ้าเป็นไทย แสดงแค่ Label
            <>{item.label}</>
          )}
        </Link>
      </motion.div>
    ))}
  </motion.div>
);

// (LanguageToggle คงเดิม - ฉบับแก้ไขล่าสุด)
const LanguageToggle = () => {
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string;

  const getNewPath = (targetLocale: 'th' | 'en') => {
    return pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
  };

  const spring = { type: "spring", stiffness: 700, damping: 30 };

  const linkClasses = "relative z-10 w-10 text-center rounded-full px-3 py-1 transition-colors duration-200";
  const activeText = "text-slate-900 dark:text-slate-100";
  const inactiveText = "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100";

  return (
    <div className="flex items-center gap-1 font-mono font-bold text-sm
                  bg-slate-200 dark:bg-slate-800 rounded-full p-1 relative"
    >
      <motion.div
        className="absolute z-0 top-1 w-10 h-[calc(100%-8px)] bg-white dark:bg-slate-700 rounded-full shadow-sm"
        layout
        transition={spring} 
        style={{ left: currentLocale === 'th' ? '4px' : '48px' }}
      />
      <Link 
        href={getNewPath('th')}
        className={`${linkClasses} ${currentLocale === 'th' ? activeText : inactiveText}`}
      >
        TH
      </Link>
      <Link 
        href={getNewPath('en')}
        className={`${linkClasses} ${currentLocale === 'en' ? activeText : inactiveText}`}
      >
        EN
      </Link>
    </div>
  );
};

// TAG: [THE-FIX] (3/6) สร้าง Type สำหรับ Base Nav Item
interface BaseNavItem {
  id: string;
  href: string;
  label: string;
  number: string;
}

// * TAG: [i18n-FIX] (6/6)
// * "ผ่าตัด" MenuLinks เพื่อรับ 'locale' และแสดงผลแบบมีเงื่อนไข
const MenuLinks = ({ 
  locale, // <-- (A) รับ locale
  navItems, 
  textColor, 
  hoveredItem, 
  setHoveredItem 
}: { 
  locale: string; // <-- (A) เพิ่ม Type
  // TAG: [THE-FIX] (4/6) ใช้ Type 'BaseNavItem[]' แทน 'any[]'
  navItems: BaseNavItem[], 
  textColor: string, 
  hoveredItem: string | null, 
  setHoveredItem: (id: string | null) => void 
}) => {
  
  // (B) กำหนดโครงสร้าง Eng labels ไว้ที่นี่
  const enLabels: { [key: string]: { label: string, splitAt: number } } = {
    home: { label: "home", splitAt: 3 },
    expertise: { label: "expertise", splitAt: 8 },
    work: { label: "work", splitAt: 3 },
    experience: { label: "experience", splitAt: 9 },
    contact: { label: "contact", splitAt: 6 }
  };

  return (
    <nav
      className="flex justify-center items-center gap-10"
      onMouseLeave={() => setHoveredItem(null)}
    >
      {navItems.map((item) => {
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
              whitespace-nowrap {/* <-- * TAG: [THE-FIX] เพิ่มบรรทัดนี้ */}
              ${textColor}
              ${isHovered ? 'opacity-100' : ''} 
              ${isOtherHovered ? 'opacity-50' : ''}
            `}
          >
            {/* (C) Conditional Rendering */}
            {locale === 'en' ? (
              // === เวอร์ชันอังกฤษ (มี < / >) ===
              <>
                &lt;/{enLabels[item.id].label.slice(0, enLabels[item.id].splitAt)}
                <span className="relative">
                  <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] transition-opacity duration-300 ease-out ${isHovered ? 'opacity-100' : 'opacity-60'} ${isOtherHovered ? 'opacity-30' : ''}`}>
                    {item.number}
                  </span>
                </span>
                {enLabels[item.id].label.slice(enLabels[item.id].splitAt)}&gt;
              </>
            ) : (
              // === เวอร์ชันไทย (ไม่มี < / >) ===
              <>
                {item.label} {/* นี่คือ "หน้าหลัก", "ตัวตน", ฯลฯ */}
                <span className="relative">
                  <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] transition-opacity duration-300 ease-out ${isHovered ? 'opacity-100' : 'opacity-60'} ${isOtherHovered ? 'opacity-30' : ''}`}>
                    {item.number}
                  </span>
                </span>
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
};


// === Component หลัก ===

// * TAG: [i18n-FIX] (Interface สำหรับ tNav)
interface NavTranslations {
  home: string;
  expertise: string;
  work: string;
  experience: string;
  contact: string;
}

// * TAG: [i18n-FIX] (รับ prop 'tNav')
export function NewNavbar({ tNav }: { tNav: NavTranslations }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
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

  // * TAG: [i18n-FIX] (สร้าง navItems โดยใช้ tNav)
  // TAG: [THE-FIX] (5/6) กำหนด Type ให้ 'navItems'
  const navItems: BaseNavItem[] = [
    { id: 'home', href: `/${locale}#home`, label: tNav.home, number: '01' },
    { id: 'expertise', href: `/${locale}#expertise`, label: tNav.expertise, number: '02' },
    { id: 'work', href: `/${locale}#work`, label: tNav.work, number: '03' },
    { id: 'experience', href: `/${locale}#experience`, label: tNav.experience, number: '04' },
    { id: 'contact', href: `/${locale}#contact`, label: tNav.contact, number: '05' },
  ];

  // * TAG: [i18n-FIX] (ส่ง locale ไปให้ MobileMenuOverlay)
  // TAG: [THE-FIX] (6/6) กำหนด Type ให้ 'mobileNavItems'
  const mobileNavItems: MobileNavItem[] = navItems.map(item => ({ ...item, locale: locale }));

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 h-24"
    >
      
      {/* (Background motion.div คงเดิม) */}
      <motion.div
        className="absolute inset-0 bg-white/90 backdrop-blur-md shadow-lg shadow-black/5
                   dark:bg-slate-950/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      
      <div className="relative z-50 pt-6 max-w-7xl mx-auto px-8 h-full grid grid-cols-3 items-center">
        
        {/* (Slot 1: ซ้าย คงเดิม) */}
        <div className="justify-self-start">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <HamburgerButton 
              isOpen={isMobileMenuOpen}
              toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              color="text-gray-900 dark:text-gray-100" 
            />
          </div>
        </div>

        {/* === Slot 2: กลาง === */}
        <div className="justify-self-center">
            <div className="hidden md:flex">
              {/* * TAG: [i18n-FIX] (ส่ง locale={locale}) */}
              <MenuLinks 
                locale={locale}
                navItems={navItems}
                textColor="text-gray-900 dark:text-gray-100" 
                hoveredItem={hoveredItem}
                setHoveredItem={setHoveredItem}
              />
            </div>
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

        {/* (Slot 3: ขวา คงเดิม) */}
        <div className="justify-self-end">
          <div className="hidden md:flex">
            <LanguageToggle />
          </div>
          <div className="md:hidden">
            <AnimatePresence>
              {!isMobileMenuOpen && (
                <motion.div
                  initial={false}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  <LanguageToggle />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* (Mobile-Overlay-Layer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          // * TAG: [i18n-FIX] (ส่ง mobileNavItems ที่มี locale)
          <MobileMenuOverlay 
            items={mobileNavItems} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>
    </header>
  );
}
