// TAG: [Master-Plan] (1)
import { Kanit, Sarabun } from "next/font/google";

// TAG: [Master-Plan] (2)
import "./globals.css"; // (ถูกต้อง)

// TAG: [Fix-v4] (1)
// เราต้องใช้ 'variable' กับ Kanit ด้วย
const kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: '--font-kanit', // <--- **สำคัญ**
  display: 'swap',
});

// TAG: [Master-Plan] (4)
const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["400", "700"],
  variable: '--font-sarabun', // (ถูกต้อง)
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      {/*
        * TAG: [Fix-v4] (2)
        * 1. ส่ง 'kanit.variable' เข้าไป
        * 2. ส่ง 'sarabun.variable' เข้าไป
        * 3. **ลบ 'bg-white' ออก** (ให้ Page จัดการเอง)
        * 4. เพิ่ม 'font-sans' เพื่อบอก Tailwind ให้ใช้ฟอนต์ Kanit เป็นหลัก
      */}
      <body className={`${kanit.variable} ${sarabun.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}