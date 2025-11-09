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
    // TAG: [Fix-Hook-Animation] (1)
    // เพิ่ม 'className="scroll-smooth"' ที่นี่
    // นี่คือคำสั่งที่บอกเบราว์เซอร์ให้ "เลื่อน" (Scroll)
    // แทนการ "กระโดด" (Jump)
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      
      {/* (body className ฯลฯ ของคุณ ถูกต้องเหมือนเดิม) */}
      <body className={`${kanit.variable} ${sarabun.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}