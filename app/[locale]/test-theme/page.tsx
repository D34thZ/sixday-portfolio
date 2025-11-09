// 📍 ที่อยู่ไฟล์: app/[locale]/test-theme/page.tsx
'use client';

// (สำคัญ) เราจะ import 'ThemeToggle' ตัวใหม่ของเรา
import { ThemeToggle } from '../../components/layout/ThemeToggle';
// (สำคัญ) เรา "ไม่" import ThemeProvider ที่นี่
// เพราะ app/[locale]/layout.tsx จะ "ห่อ" หน้านี้ด้วย ClientProviders ให้อยู่แล้ว

export default function TestThemePage() {
  return (
    // (แก้) เราไม่ต้องห่อด้วย ThemeProvider ซ้ำ
    // เราจะ Render หน้าเว็บโดยตรง
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 pt-40"> {/* (เพิ่ม pt-40 เพื่อหลบ Navbar) */}
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Theme Toggle Test (หน้าทดสอบ)
      </h1>
      
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">
          ถ้าเห็นข้อความนี้เปลี่ยนสีตาม Dark Mode แสดงว่า Provider ทำงาน
        </p>
        
        <div className="flex gap-4 items-center">
          <span className="text-gray-900 dark:text-white">ปุ่ม Toggle:</span>
          {/* นี่คือปุ่มที่เรากำลังทดสอบ */}
          <ThemeToggle />
        </div>
        
        <div className="mt-8 p-4 border border-gray-300 dark:border-gray-600 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ถ้าไม่เห็นปุ่ม ให้เปิด Console (F12)
          </p>
        </div>
      </div>
    </div>
  );
}