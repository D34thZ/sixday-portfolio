// 📍 ที่อยู่ไฟล์: app/components/layout/NewNavbar.tsx
// TAG: [Client] (ถูกต้อง)
'use client';

// TAG: [Imports] (1)
// Import ทุกอย่างที่เราต้องใช้
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// TAG: [Component] (2)
// เราจะเก็บโครงสร้างเดิมของ NewNavbar ไว้
export function NewNavbar() {
  // TAG: [State] (3)
  // State 1: 'scrolled' (เหมือนเดิม)
  const [scrolled, setScrolled] = useState(false);
  
  // State 2: 'hoveredItem' (จากไอเดีย Code Dark/Blue)
  // เราจะเก็บ 'id' (เช่น 'home', 'work') ของเมนูที่กำลังชี้
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // TAG: [i18n] (4) (เหมือนเดิม)
  const params = useParams();
  const locale = params.locale as string; 

  // TAG: [Effect] (5) (เหมือนเดิม)
  // ตัวดักฟังการ Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // เปลี่ยนเป็น 50 (จากไอเดีย Code White)
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TAG: [Data] (6)
  // สร้าง Array ของเมนูเพื่อง่ายต่อการ map (จากไอเดีย Code Dark/Blue)
  const navItems = [
    { id: 'home', href: `/${locale}`, label: 'home', number: '01', splitAt: 3 },
    { id: 'expertise', href: `/${locale}/expertise`, label: 'expertise', number: '02', splitAt: 8 },
    { id: 'work', href: `/${locale}/work`, label: 'work', number: '03', splitAt: 3 },
    { id: 'experience', href: `/${locale}/experience`, label: 'experience', number: '04', splitAt: 9 },
    { id: 'contact', href: `/${locale}/contact`, label: 'contact', number: '05', splitAt: 6 },
  ];

  // TAG: [Layout] (7) "ชุดเมนู" (MenuLinks)
  // นี่คือส่วนที่รวมสไตล์จาก 'Code White' และ 'Code Dark/Blue'
  const MenuLinks = ({ className, textColor }: { className?: string, textColor: string }) => (
    <nav
      // TAG: [Style-White] (A)
      // ใช้ flex, justify-center, gap-10 (จาก Code White)
      className={`flex justify-center items-center gap-10 ${className}`}
      // TAG: [Style-Dark] (B)
      // เมื่อเมาส์ออกจาก <nav> ให้เคลียร์ 'hoveredItem'
      onMouseLeave={() => setHoveredItem(null)}
    >
      {navItems.map((item) => {
        // TAG: [Style-White] (C)
        // แยกตัวอักษรก่อน-หลัง (จาก Code White)
        const before = item.label.slice(0, item.splitAt);
        const after = item.label.slice(item.splitAt);
        
        // TAG: [Style-Dark] (D)
        // ตรวจสอบว่าเมนูนี้คือเมนูที่กำลังชี้หรือไม่
        const isHovered = hoveredItem === item.id;
        // ตรวจสอบว่ามีเมนู "อื่น" กำลังถูกชี้หรือไม่
        const isOtherHovered = hoveredItem !== null && !isHovered;

        return (
          <Link
            key={item.id}
            href={item.href}
            // TAG: [Style-Dark] (E)
            // เมื่อเมาส์ชี้ ให้ตั้งค่า 'hoveredItem'
            onMouseEnter={() => setHoveredItem(item.id)}
            
            // TAG: [Style-Merge] (F)
            // นี่คือหัวใจหลัก:
            // 1. ใช้สไตล์พื้นฐาน (font-mono, text-sm, ฯลฯ) จาก Code White
            // 2. ใช้ 'textColor' ที่ส่งมาจาก 'scrolled' state
            // 3. ใช้ 'isHovered' / 'isOtherHovered' (จาก Code Dark/Blue) เพื่อเปลี่ยน opacity
            className={`
              relative transition-all duration-300 font-mono text-sm tracking-wide
              ${textColor}
              ${isHovered ? 'opacity-100 scale-105' : ''}
              ${isOtherHovered ? 'opacity-50' : ''}
            `}
          >
            {/* TAG: [Style-White] (G) โครงสร้างตัวอักษร */}
            &lt;/{before}
            <span className="relative">
              <span className={`
                absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold 
                transition-opacity duration-300
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
  // ใช้ 'AnimatePresence' (จากไฟล์เดิมของเรา)
  // แต่ใช้สไตล์จาก 'Code White'
  return (
    <header 
      // TAG: [Style-White] (H)
      // ตั้งค่า header ให้ลอยอยู่ด้านบน (h-24, pt-10)
      className="fixed top-0 left-0 right-0 z-50 h-24 pt-10 transition-all duration-400"
    >
      <AnimatePresence initial={false}>
        {/*
          TAG: [Navbar-1] (โปร่งใส ตอนอยู่บนสุด) 
        */}
        {!scrolled && (
          <motion.div
            key="nav1"
            className="w-full h-full"
            exit={{ opacity: 0, y: '-100%' }} // Animation เดิมของเรา
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {/* TAG: [Style-White] (I) ใช้ข้อความสีเข้ม */}
            <MenuLinks textColor="text-gray-900" />
          </motion.div>
        )}

        {/*
          TAG: [Navbar-2] (พื้นหลังทึบ ตอน scroll) 
        */}
        {scrolled && (
          <motion.div
            key="nav2"
            className="w-full h-full relative" // Animation เดิมของเรา
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {/* TAG: [Style-White] (J) พื้นหลังสีเข้มทึบ */}
            <motion.div 
              className="absolute inset-0 bg-[#1A191D] -z-10 shadow-lg shadow-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* TAG: [Style-White] (K) ใช้ข้อความสีขาว */}
            <MenuLinks textColor="text-[#FBFBFC]" />
          </motion.div>
        )}

      </AnimatePresence>
    </header>
  );
}