// TAG: [Theme] 'use client' จำเป็น เพราะเราต้องเช็ค 'theme'
// และ 'setTheme' บนฝั่ง Client เท่านั้น
'use client';

import { useState, useEffect } from 'react';
// TAG: [Theme] Import 'useTheme' hook จาก next-themes
import { useTheme } from 'next-themes';
// TAG: [Animation] Import 'framer-motion' สำหรับ animation
import { motion, AnimatePresence } from 'framer-motion';

// TAG: [Icon] ไอคอน Sun (Light Mode) แบบ inline SVG
const SunIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V18.75a.75.75 0 01.75-.75zM5.166 17.834a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 10-1.06-1.061l-1.591 1.59zM3 12a.75.75 0 01-.75-.75h-2.25a.75.75 0 010-1.5H2.25A.75.75 0 013 12zM6.166 5.106a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.591z" />
  </svg>
);

// TAG: [Icon] ไอคอน Moon (Dark Mode) แบบ inline SVG
const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-4.5 4.219A10.5 10.5 0 019.528 1.718z"
      clipRule="evenodd"
    />
  </svg>
);

export function ThemeToggle() {
  // TAG: [Hydration] 'mounted' state ใช้แก้ปัญหา Hydration Mismatch
  // Server Render (SSR) ไม่รู้ว่า Theme คืออะไร (เป็น 'system')
  // Client (Browser) รู้ Theme ที่แท้จริงจาก localStorage
  // เราจะ "ไม่ Render ปุ่มนี้" จนกว่า Client จะ Mount (useEffect)
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // TAG: [Hydration] เมื่อ Component Mount (ทำงานฝั่ง Client)
  // ให้ set 'mounted' เป็น true
  useEffect(() => {
    setMounted(true);
  }, []);

  // TAG: [Hydration] ถ้ายังไม่ Mount (ยังอยู่บน Server หรือเพิ่งเริ่ม)
  // ให้ Render ปุ่มเปล่าๆ (Placeholder) เพื่อจองพื้นที่
  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder
  }

  // TAG: [Logic] เมื่อ Mount แล้ว ให้แสดงปุ่มที่ถูกต้อง
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      // TAG: [Design] สไตล์ปุ่มแบบ Apple Vibe
      // 'text-secondary-...': ใช้สีข้อความรอง (เทา)
      // 'hover:text-primary-...' : เมื่อ Hover ให้ใช้สีข้อความหลัก (ดำ/ขาว)
      className="p-1.5 rounded-full text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
      aria-label="Toggle theme"
    >
      {/* TAG: [Animation] ใช้ AnimatePresence + motion.div
        เพื่อสร้าง cross-fade animation ระหว่างไอคอน
      */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDarkMode ? 'moon' : 'sun'}
          initial={{ opacity: 0, y: -10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {isDarkMode ? (
            <MoonIcon className="w-5 h-5" />
          ) : (
            <SunIcon className="w-5 h-5" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}