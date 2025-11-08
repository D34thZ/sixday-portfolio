// TAG: [Theme] เราต้องใช้ 'use client' เพราะ next-themes
// จำเป็นต้องเข้าถึง 'window' และ 'localStorage' ของเบราว์เซอร์
'use client';

import * as React from 'react';
// TAG: [Theme] Import Provider หลักจาก next-themes
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

// TAG: [Theme] นี่คือ Component "ตัวห่อ" (Wrapper) ของเรา
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    // TAG: [Theme] ตั้งค่า Provider
    <NextThemesProvider
      // TAG: [Config] 'attribute="class"' คือการบอก 'next-themes'
      // ให้สลับ Theme โดยการเปลี่ยน class บนแท็ก <html> (เช่น <html class="dark">)
      // ซึ่งนี่คือวิธีที่ TailwindCSS (darkMode: "class") ของเราทำงาน
      attribute="class"
      
      // TAG: [Config] 'defaultTheme="system"'
      // ให้ใช้ Theme ตามการตั้งค่าของ OS (Windows/Mac) เป็นค่าเริ่มต้น
      defaultTheme="system"
      
      // TAG: [Config] 'enableSystem'
      // เปิดใช้งานการตรวจจับ Theme ของ OS
      enableSystem
      
      // TAG: [Config] 'disableTransitionOnChange'
      // ปิดการ transition ตอนเปลี่ยน Theme เพื่อความลื่นไหล
      disableTransitionOnChange={false} 
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}