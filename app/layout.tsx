// 📍 ที่อยู่ไฟล์: app/layout.tsx (Root Layout)
// (ฉบับแก้ไข: ลบ <html>, <body>, และ Inter ทิ้ง)

// (แก้) Import globals.css ที่นี่
import './globals.css';

// (ลบ) metadata (ย้ายไป locale layout)
// (ลบ) Inter (ย้ายไป locale layout)

export default function RootLayout({
  children,
}: {
  children: React.React.Node;
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