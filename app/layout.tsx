// 📍 ที่อยู่ไฟล์: app/layout.tsx (Root Layout)
// (ฉบับแก้ไข: ลบ <html>, <body>, และ Inter ทิ้ง)

// TAG: [THE-FIX] (1/2) Import 'ReactNode' โดยตรง
import { ReactNode } from 'react';
import './globals.css';

// (ลบ) metadata (ย้ายไป locale layout)
// (ลบ) Inter (ย้ายไป locale layout)

export default function RootLayout({
  children,
}: {
  // TAG: [THE-FIX] (2/2) 📍📍📍 นี่คือจุดที่แก้ไข 📍📍📍
  // เปลี่ยนจาก 'React.React.Node' (ที่พิมพ์ผิด) เป็น 'ReactNode'
  children: ReactNode;
}) {
  // * TAG: [Fix-Nested-HTML]
  // * ห้ามมี <html> หรือ <body> ที่นี่
  // * คืนค่า children โดยตรง เพื่อให้ locale layout จัดการ
  return (
    <>
      {children}
    </>
  );
}