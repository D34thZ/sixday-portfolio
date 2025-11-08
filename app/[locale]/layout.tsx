// 📍 ที่อยู่ไฟล์: app/[locale]/layout.tsx

// TAG: [Imports] (1)
import { TranslationsProvider } from "../context/i18n.context";
import { ThemeProvider } from "../components/providers/ThemeProvider";
import { NewNavbar } from "../components/layout/NewNavbar";
import thMessages from "../../messages/th.json";
import enMessages from "../../messages/en.json";

export const metadata = {
  title: "sixday.dev",
  description: "Kritsada's Portfolio",
};

// TAG: [Fix-Crash] (2)
// 'async' คือหัวใจของการแก้ปัญหานี้
// บรรทัดนี้จะต้องมี 'async'
export default async function RootLayout({
  children,
  params
}: {
  children: React.React.Node;
  params: {locale: string};
}) {

  // บรรทัดนี้ (ที่ Error ฟ้อง) จะถูกย้ายมาอยู่ล่าง 'async'
  const { locale } = params; 
  const messages = locale === 'th' ? thMessages : enMessages;

  return (
    <div>
      <ThemeProvider>
        <TranslationsProvider messages={messages}>
          <NewNavbar />
          <main>
            {children}
          </main>
        </TranslationsProvider>
      </ThemeProvider>
    </div>
  );
}