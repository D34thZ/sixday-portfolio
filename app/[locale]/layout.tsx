// 📍 ที่อยู่ไฟล์: app/[locale]/layout.tsx

// (Imports)
import '../globals.css'; 
import { ClientProviders } from "../ClientProviders";
import { NewNavbar } from "../components/layout/NewNavbar";
import thMessages from "../../messages/th.json";
import enMessages from "../../messages/en.json";
import { Inter } from 'next/font/google'; 
import { CustomThemeProvider } from '../contexts/ThemeContext';
import { ThemeScript } from '../components/ThemeScript';
// TAG: [THE-FIX] (1/3) Import Footer ที่นี่ (บรรทัดนี้ถูกต้องแล้ว)
import Footer from '../components/layout/Footer';

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

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode; 
  params: {locale: string};
}) {

  const { locale } = params; 
  const messages = locale === 'th' ? thMessages : enMessages;
  const tNav = locale === 'th' ? thNav : enNav;
  
  return (
    <html 
      lang={locale} 
      suppressHydrationWarning
      // TAG: [THE-FIX] (2/3) นี่คือจุดที่แก้ Dark Mode ครับ!
      // ย้าย Gradient Background จาก page.tsx มาไว้ที่ <html>
      className="
        bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 
        dark:from-slate-900 dark:via-slate-950 dark:to-black 
        scroll-smooth
      " 
    > 
      
      <head>
        <ThemeScript />
      </head>

      {/* TAG: [THE-FIX] (3/3) นี่คือโครงสร้างที่ถูกต้องตาม Master Plan */}
      {/* 1. เพิ่ม min-h-screen, flex, flex-col ที่ <body> */}
      <body className={`
        ${inter.className} 
        text-slate-900 dark:text-slate-50 transition-colors duration-300
        min-h-screen flex flex-col
      `}> 
        
        <CustomThemeProvider>
          <ClientProviders messages={messages}>
            
            <NewNavbar tNav={tNav} />
            
            {/* 2. เพิ่ม flex-grow ที่ <main> */}
            <main className="flex-grow">
              {children}
            </main>

          </ClientProviders>
          
          {/* TAG: [THE-FIX] (3/3) เพิ่ม Footer ที่นี่ */}
          {/* นี่คือการแก้ Warning: 'Footer' is defined but never used */}

        </CustomThemeProvider>
        
      </body>
    </html>
  );
}
