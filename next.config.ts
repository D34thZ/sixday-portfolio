import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // TAG: [Fix-1.3.6] เราได้ "รื้อ" 'withNextIntl' plugin ทิ้งทั้งหมด
  // เพราะเราได้เปลี่ยนไปใช้วิธี Manual Load ใน 'layout.tsx' แล้ว (ใน Fix 1.5.6)
  // นี่คือ Config "สะอาด" ของ Next.js 15
  // มันจะใช้ Webpack โดยอัตโนมัติ (ตามที่เราต้องการ)
  experimental: {
    // ว่างไว้
  },
};

// TAG: [Fix-1.3.6] ส่งออก 'nextConfig' แบบ "สะอาด"
// โดย "ไม่มี" การห่อหุ้มด้วย 'intlPlugin(nextConfig)' อีกต่อไป
export default nextConfig;