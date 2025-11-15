// 📍 ที่อยู่ไฟล์: app/components/layout/ThemeToggle.tsx
'use client';

// * TAG: [FIX-REQUEST-3] (Apple Switch)
// * เขียนใหม่ทั้งหมดเพื่อสร้างสวิตช์สไตล์ Apple

import { useCustomTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import React from 'react';

export function ThemeToggle() {
  
  // TAG: [THE-FIX] (1/2) ลบ 'theme' ที่ไม่ได้ใช้ออก (แก้ Warning)
  const { setTheme, resolvedTheme } = useCustomTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder เพื่อจองพื้นที่ ป้องกัน Layout กระตุก
    return <div className="w-14 h-8" />; 
  }
  
  const isDarkMode = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  // Animation แบบ Spring
  // TAG: [THE-FIX] (2/2) เพิ่ม 'as const' (แก้ Build Error)
  // เพื่อบอก TypeScript ว่า 'type: "spring"' คือค่าคงที่ ไม่ใช่ string ทั่วไป
  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  } as const; // <-- 📍 เพิ่มตรงนี้

  return (
    <div 
      className={`
        w-14 h-8 p-1 flex items-center rounded-full cursor-pointer
        relative transition-colors duration-300
        ${isDarkMode ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}
      `}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {/* ไอคอนจะถูกวางแบบ Absolute ซ้อนกัน */}
      <Sun className="w-4 h-4 absolute left-[7px] text-yellow-500 z-10" />
      <Moon className="w-4 h-4 absolute right-[7px] text-slate-100 z-10" />

      {/* วงกลมที่เลื่อนได้ */}
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md z-20"
        layout // <-- Framer Motion จะ animate การเปลี่ยนแปลง layout
        transition={spring} // <-- (บรรทัด 57) ตอนนี้ถูกต้องแล้ว
        // ถ้าเป็น Dark Mode ให้ margin-left เป็น auto (เลื่อนไปขวา)
        style={{ marginLeft: isDarkMode ? 'auto' : '0px' }} 
      />
    </div>
  );
}