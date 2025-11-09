// 📍 ที่อยู่ไฟล์: app/ClientProviders.tsx
'use client'; 

// (เพิ่ม) Import 'useEffect'
import { useEffect } from 'react'; 
import { TranslationsProvider } from "./context/i18n.context";
import { ThemeProvider } from "./ThemeProvider";

export function ClientProviders({ 
  children, 
  messages 
}: { 
  children: React.React.Node; 
  messages: any; 
}) {

  // * TAG: [Debug-Mount]
  // * เพิ่ม 'useEffect' เพื่อเช็คว่า Component นี้ 'mount' สำเร็จหรือไม่
  useEffect(() => {
    console.log("✅ [Debug] ClientProviders Mounted");
  }, []);

  return (
    <ThemeProvider>
      <TranslationsProvider messages={messages}>
        {children}
      </TranslationsProvider>
    </ThemeProvider>
  );
}