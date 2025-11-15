// 📍 ที่อยู่ไฟล์: app/[locale]/layout.tsx

import { ReactNode } from 'react';
import '../globals.css'; 
import { ClientProviders } from "../ClientProviders";
import { NewNavbar } from "../components/layout/NewNavbar";
import thMessages from "../../messages/th.json";
import enMessages from "../../messages/en.json";
import { Inter } from 'next/font/google'; 
import { CustomThemeProvider } from '../contexts/ThemeContext';
import { ThemeScript } from '../components/ThemeScript';

const enNav = {
  home: "home",
  expertise: "expertise",
  work: "work",
  experience: "experience",
  contact: "contact"
};

const thNav = {
  home: "หน้าหลัก",
  expertise: "ตัวตน",
  work: "ผลงาน",
  experience: "เส้นทาง",
  contact: "ติดต่อ"
};

export const metadata = {
  title: "sixday.dev",
  description: "Kritsada's Portfolio",
};

const inter = Inter({ subsets: ['latin'] });

// 🔥 FIX: เพิ่ม async และ await params
export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>; // <-- เปลี่ยนเป็น Promise
}) {
  // 🔥 FIX: await params ก่อนใช้งาน
  const { locale } = await params;
  
  const messages = locale === 'th' ? thMessages : enMessages;
  const tNav = locale === 'th' ? thNav : enNav;
  
  return (
    <html 
      lang={locale} 
      suppressHydrationWarning
      className="
        bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 
        dark:from-slate-900 dark:via-slate-950 dark:to-black 
        scroll-smooth
      " 
    > 
      <head>
        <ThemeScript />
      </head>

      <body className={`
        ${inter.className} 
        text-slate-900 dark:text-slate-50 transition-colors duration-300
        min-h-screen flex flex-col
      `}> 
        <CustomThemeProvider>
          <ClientProviders messages={messages}>
            <NewNavbar tNav={tNav} /> 
            <main className="flex-grow">
              {children}
            </main>
          </ClientProviders>
        </CustomThemeProvider>
      </body>
    </html>
  );
}