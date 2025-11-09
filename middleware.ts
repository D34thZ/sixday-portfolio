// 📍 ที่อยู่ไฟล์: middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'th'];
const defaultLocale = 'th';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TAG: [Routing] (คงเดิม) ตรวจสอบว่า Path มี 'locale' (เช่น /th/about) หรือไม่
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // TAG: [Routing] (คงเดิม) ข้ามไฟล์ static
  // * หมายเหตุ: 'matcher' (ด้านล่าง) คือตัวจัดการหลัก
  // * บล็อกนี้แทบจะไม่ถูกเรียกใช้ ถ้า 'matcher' ทำงานถูกต้อง
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }
  
  // TAG: [Routing] (คงเดิม) ถ้าไม่มี (เช่น / หรือ /about)
  if (!pathnameHasLocale) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // ... (ส่วน Fix-7.0, Headers, ฯลฯ ของคุณ ถูกต้อง 100% ครับ) ...
  const currentLocale = pathname.split('/')[1];
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('X-Locale', currentLocale); 

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// TAG: [Fix-404] (1)
// นี่คือจุด "ซ่อม" ครับ
export const config = {
  matcher: [
    // (1) เราจะ "ดักจับ" ทุก Path
    // (2) "ยกเว้น" (?!...) Path ที่เป็น:
    //     - api
    //     - _next/static
    //     - _next/image
    //     - images  <--- เพิ่ม 'images' เข้าไปในรายการเพิกเฉย
    //     - favicon.ico
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)'
  ]
};