// 📍 ที่อยู่ไฟล์: app/contexts/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark'; // ธีมที่แท้จริง (หลัง 'system' ถูกแปลง)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sixday-dev-theme';

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. (สำหรับ SSR) คืนค่า 'system' เพื่อป้องกัน Mismatch
    if (typeof window === 'undefined') {
      return 'system';
    }
    // 2. (สำหรับ Client) อ่านค่าจาก localStorage
    return (localStorage.getItem(LOCAL_STORAGE_KEY) as Theme) || 'system';
  });
  
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 3. เมื่อ state 'theme' เปลี่ยน
    const root = window.document.documentElement;
    let actualTheme: 'light' | 'dark';

    if (theme === 'system') {
      // 4. ตรวจสอบ 'system'
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
      actualTheme = systemTheme.matches ? 'dark' : 'light';
    } else {
      actualTheme = theme;
    }
    
    // 5. อัปเดต <html> และ state
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
    setResolvedTheme(actualTheme);
    
    // 6. บันทึกลง localStorage (ถ้าไม่ใช่ 'system')
    if (theme !== 'system') {
      localStorage.setItem(LOCAL_STORAGE_KEY, theme);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    
    // 7. เพิ่ม Listener เพื่อตรวจจับการเปลี่ยนแปลง 'system'
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const newActualTheme = e.matches ? 'dark' : 'light';
        root.classList.remove('light', 'dark');
        root.classList.add(newActualTheme);
        setResolvedTheme(newActualTheme);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);

  }, [theme]); // <-- ทำงานทุกครั้งที่ 'theme' (light, dark, system) เปลี่ยน

  const value = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook สำหรับให้ Component อื่นๆ เรียกใช้
export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};