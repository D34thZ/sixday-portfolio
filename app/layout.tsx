import type { Metadata } from "next";
// 1. นำเข้าฟอนต์ Kanit และ Sarabun (แทนที่ Geist เดิม)
import { Kanit, Sarabun } from "next/font/google";
import "./globals.css";

// 2. ตั้งค่าฟอนต์ Kanit
const kanit = Kanit({
  subsets: ["latin", "thai"], // โหลด subset ภาษาไทยและละติน
  weight: ["300", "400", "500", "700"], // โหลดน้ำหนักที่เราจะใช้
  variable: "--font-kanit", // ตั้งชื่อ CSS Variable ว่า --font-kanit
  display: "swap",
});

// 3. ตั้งค่าฟอนต์ Sarabun
const sarabun = Sarabun({
  subsets: ["latin", "thai"],
  weight: ["400", "700"],
  variable: "--font-sarabun", // ตั้งชื่อ CSS Variable ว่า --font-sarabun
  display: "swap",
});

// 4. อัปเดต Metadata ของโปรเจกต์
export const metadata: Metadata = {
  title: "SixDay.dev",
  description: "The Portfolio IS the Masterpiece",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 5. เปลี่ยนภาษาหลักเป็น "th" (ภาษาไทย)
    <html lang="th">
      {/* 6. ใช้ตัวแปรฟอนต์ในแท็ก <body> 
        เราจะใช้ Kanit เป็นฟอนต์หลัก (font-sans) ของทั้งเว็บ
        และใส่ Sarabun เป็นตัวแปรเผื่อเรียกใช้
      */}
      <body className={`${kanit.variable} ${sarabun.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}