// 📍 ที่อยู่ไฟล์: app/ClientProviders.tsx
'use client'; 

// (ลบ useEffect และ ThemeProvider ทิ้ง)
import { TranslationsProvider } from "./context/i18n.context";

export function ClientProviders({ 
  children, 
  messages 
}: { 
  children: React.ReactNode; 
  messages: any; 
}) {

  // * TAG: [Refactor-Cookie]
  // * ลบ <ThemeProvider> ที่ห่ออยู่ออกไป
  return (
    <TranslationsProvider messages={messages}>
      {children}
    </TranslationsProvider>
  );
}