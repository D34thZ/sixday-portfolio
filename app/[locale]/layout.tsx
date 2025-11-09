// 📍 ที่อยู่ไฟล์: app/[locale]/layout.tsx
// (ฉบับแก้ไข: เพิ่ม <html>, <body>, และ Inter กลับมาที่นี่)

// TAG: [Imports] (1)
import { ClientProviders } from "../ClientProviders";
import { NewNavbar } from "../components/layout/NewNavbar";
import thMessages from "../../messages/th.json";
import enMessages from "../../messages/en.json";
import { Inter } from 'next/font/google'; // <-- (แก้) ย้าย Inter กลับมาที่นี่
// (ลบ) globals.css (ย้ายไป root layout แล้ว)

// (แก้) เพิ่ม metadata กลับมาที่นี่
export const metadata = {
  title: "sixday.dev",
  description: "Kritsada's Portfolio",
};

// (แก้) ตั้งค่า Inter ที่นี่
const inter = Inter({ subsets: ['latin'] });

// TAG: [Fix-Nested-HTML] (2)
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.React.Node;
  params: {locale: string};
}) {

  const { locale } = params; 
  const messages = locale === 'th' ? thMessages : enMessages;

  return (
    // * TAG: [Fix-Dark-Mode-Not-Working]
    // * 1. นี่คือ <html> "หนึ่งเดียว" ของแอป
    // * 2. เพิ่ม suppressHydrationWarning
    <html lang={locale} suppressHydrationWarning> 
      
      {/*
        * 3. นี่คือ <body> "หนึ่งเดียว" ของแอป
        * 4. เราใส่ฟอนต์ (inter.className) และสี dark mode ที่นี่
      */}
      <body className={`${inter.className} bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300`}> 
        
        {/* 5. Providers และ Navbar อยู่ข้างใน body */}
        <ClientProviders messages={messages}>
          <NewNavbar />
          <main>
            {children}
          </main>
        </ClientProviders>
        
      </body>
    </html>
  );
}