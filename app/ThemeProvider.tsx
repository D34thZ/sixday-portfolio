// 📍 ที่อยู่ไฟล์: app/ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
// (ลบ) useEffect และ console.log

export function ThemeProvider({ children }: { children: React.React.Node }) {
  
  return (
    <NextThemesProvider 
      attribute="class" // <-- 1. บอกให้ใส่ 'class'
      defaultTheme="system" // <-- 2. กลับไปใช้ 'system'
      enableSystem // <-- 3. เปิด 'system'
      disableTransitionOnChange
      storageKey="sixday-dev-theme"
    >
      {children}
    </NextThemesProvider>
  );
}