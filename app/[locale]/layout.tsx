// 📍 ที่อยู่ไฟล์: app/[locale]/layout.tsx

// (Imports ทั้งหมดเหมือนเดิม)
import '../globals.css'; 
import { ClientProviders } from "../ClientProviders";
import { NewNavbar } from "../components/layout/NewNavbar";
import thMessages from "../../messages/th.json";
import enMessages from "../../messages/en.json";
import { Inter } from 'next/font/google'; 
import { CustomThemeProvider } from '../contexts/ThemeContext';
import { ThemeScript } from '../components/ThemeScript';

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
  
  return (
    // * TAG: [FIX-REQUEST-1] (Smooth Scroll)
    // * เพิ่ม 'scroll-smooth' เพื่อให้การเลื่อน (hook links) นุ่มนวล
    <html 
      lang={locale} 
      suppressHydrationWarning
      className="bg-white dark:bg-slate-950 scroll-smooth" 
    > 
      
      <head>
        <ThemeScript />
      </head>

      <body className={`${inter.className} text-slate-900 dark:text-slate-50 transition-colors duration-300`}> 
        
        <CustomThemeProvider>
          <ClientProviders messages={messages}>
            <NewNavbar />
            <main>
              {children}
            </main>
          </ClientProviders>
        </CustomThemeProvider>
        
      </body>
    </html>
  );
}