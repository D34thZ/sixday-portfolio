// 📍 ที่อยู่ไฟล์: app/components/layout/ThemeToggle.tsx
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // * TAG: [Debug] (แก้)
    // * เพิ่ม Log เพื่อดูว่า Toggle 'mount' หรือไม่
    console.log('🎨 [Debug] ThemeToggle Mounted, current theme:', theme);
  }, [theme]); // <-- (แก้) ให้ log ใหม่เมื่อ theme เปลี่ยน

  if (!mounted) {
    // (แก้) ใช้ placeholder แบบที่ Claude แนะนำ
    return (
      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
    );
  }

  const toggleTheme = () => {
    // * TAG: [Debug] (แก้)
    console.log('🔄 [Debug] Toggle clicked, changing from:', theme);
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    // (แก้) ใช้สไตล์ใหม่ของ Claude เพื่อให้เห็นชัดเจน
    <button
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-lg border-2 border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition-all duration-200 flex items-center justify-center"
      aria-label="Toggle theme"
      type="button"
    >
      <span className="sr-only">{theme === 'light' ? 'Light' : 'Dark'} mode</span>
      
      <Sun
        className={`absolute h-5 w-5 text-yellow-500 transform transition-all duration-300
                    ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
      />
      <Moon
        className={`absolute h-5 w-5 text-blue-400 transform transition-all duration-300
                    ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}
      />
    </button>
  );
}