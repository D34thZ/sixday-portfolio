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
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }
  
  // TAG: [Routing] (คงเดิม) ถ้าไม่มี (เช่น / หรือ /about)
  if (!pathnameHasLocale) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // TAG: [Fix-7.0] (1) อัปเกรด Middleware
  // ถ้า Path "มี" locale (เช่น /th)
  // เราจะ "ดึง" locale นั้นออกมา
  // (เช่น "/th/about" -> "th", หรือ "/en" -> "en")
  const currentLocale = pathname.split('/')[1];

  // TAG: [Fix-7.0] (2) สร้าง Headers ใหม่
  const requestHeaders = new Headers(request.headers);
  // (ตั้งค่า custom header 'X-Locale' ให้มีค่าเป็น 'th' หรือ 'en')
  requestHeaders.set('X-Locale', currentLocale); 

  // TAG: [Fix-7.0] (3) ส่ง request ต่อไป
  // พร้อมกับ Headers ที่มี 'X-Locale' แนบไปด้วย
  // นี่คือ "การส่งต่อ" ข้อมูล locale ไปให้ layout.tsx ครับ
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  // TAG: [Routing] (คงเดิม) ดักจับทุก Path
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};