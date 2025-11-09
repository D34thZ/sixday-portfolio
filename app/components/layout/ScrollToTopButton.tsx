// 📍 ที่อยู่ไฟล์: app/components/layout/ScrollToTopButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // TAG: [Effect]
  // 1. สร้าง "ตัวดักฟัง" (Listener) การ Scroll
  useEffect(() => {
    const handleScroll = () => {
      // 2. ถ้า Scroll เกิน 400px ให้แสดงปุ่ม
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 3. คืนค่า (Cleanup) เมื่อ Component ถูกทำลาย
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TAG: [Function]
  // 4. ฟังก์ชันเลื่อนกลับไปด้านบนสุด (แบบนุ่มนวล)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          // TAG: [Style]
          // 5. จัดสไตล์ (ลอยมุมล่างขวา, Apple-Style)
          className="fixed bottom-6 right-6 z-50
                     flex h-12 w-12 items-center justify-center
                     rounded-full bg-white/90 shadow-lg backdrop-blur-md
                     border border-slate-200/60
                     text-slate-900 transition-all
                     hover:scale-105 hover:shadow-xl"
          
          // TAG: [Animation]
          // 6. แอนิเมชัน Fade In / Out
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          
          // TAG: [Action]
          // 7. เรียกใช้ฟังก์ชันเมื่อคลิก
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          {/* ไอคอน "ลูกศรชี้ขึ้น" (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}