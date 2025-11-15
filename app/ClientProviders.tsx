// 📍 ที่อยู่ไฟล์: app/ClientProviders.tsx
'use client'; 

// (ลบ useEffect และ ThemeProvider ทิ้ง)
import { TranslationsProvider } from "./context/i18n.context";

// TAG: [THE-FIX] (1/2) Import 'Messages' Type ที่เราเพิ่ง Export
import { Messages } from "./context/i18n.context";

export function ClientProviders({ 
  children, 
  messages 
}: { 
  children: React.ReactNode; 
  // TAG: [THE-FIX] (2/2) เปลี่ยน 'any' เป็น Type ที่ถูกต้อง
  messages: Messages; 
}) {

  // * TAG: [Refactor-Cookie]
  // * ลบ <ThemeProvider> ที่ห่ออยู่ออกไป
  return (
    <TranslationsProvider messages={messages}>
      {children}
    </TranslationsProvider>
  );
}