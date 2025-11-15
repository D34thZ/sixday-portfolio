// 📍 ที่อยู่ไฟล์: app/[locale]/layout.tsx

// TAG: [THE-FIX] (1/4) Import 'ReactNode'
import { ReactNode } from 'react';
import '../globals.css'; 
import { ClientProviders } from "../ClientProviders";
import { NewNavbar } from "../components/layout/NewNavbar";
import thMessages from "../../messages/th.json";
import enMessages from "../../messages/en.json";
import { Inter } from 'next/font/google'; 
import { CustomThemeProvider } from '../contexts/ThemeContext';
import { ThemeScript } from '../components/ThemeScript';

// TAG: [THE-FIX] (2/4) ลบ Footer ที่ไม่ได้ใช้ออก (แก้ Warning)
// import Footer from '../components/layout/Footer';

// (ส่วน tNav คงเดิม)
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
// (จบส่วนที่เพิ่ม)

export const metadata = {
  title: "sixday.dev",
  description: "Kritsada's Portfolio",
};

const inter = Inter({ subsets: ['latin'] });

// TAG: [THE-FIX] (3/4) สร้าง Interface สำหรับ Props
// (ส่วนนี้ถูกต้องแล้ว)
interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

// TAG: [THE-FIX] (4/4) ลบ 'async' ออกจากบรรทัดนี้
export default function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) { // <-- (ส่วนนี้ถูกต้องแล้ว)

  const { locale } = params; 
  const messages = locale === 'th' ? thMessages : enMessages;
  const tNav = locale === 'th' ? thNav : enNav;
  
  return (
    <html 
      lang={locale} 
      suppressHydrationWarning
      // TAG: (คงเดิม) Gradient Background
      className="
        bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 
        dark:from-slate-900 dark:via-slate-950 dark:to-black 
        scroll-smooth
      " 
    > 
      
      <head>
        <ThemeScript />
      </head>

      {/* TAG: (คงเดิม) โครงสร้าง Body */}
      <body className={`
        ${inter.className} 
        text-slate-900 dark:text-slate-50 transition-colors duration-300
        min-h-screen flex flex-col
      `}> 
        
        <CustomThemeProvider>
          <ClientProviders messages={messages}>
            
            {/* 📍📍📍 นี่คือจุดที่แก้ไข 📍📍📍 */}
            <NewNavbar tNav={tNav} /> 
            
            <main className="flex-grow">
              {children}
            </main>

          </ClientProviders>
        </CustomThemeProvider>
        
        {/* (Footer จะถูก Render จาก page.tsx ตามที่คุณยืนยันไว้) */}

      </body>
    </html>
  );
}