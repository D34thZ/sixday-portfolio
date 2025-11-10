// 📍 ที่อยู่ไฟล์: app/components/ThemeScript.tsx
'use client';

// (ไฟล์นี้ตั้งใจให้เป็น 'use client' แต่จะถูกใช้ใน Server Component)
// เราใช้ 'dangerouslySetInnerHTML' เพื่อฝังสคริปต์ที่รันทันที

const LOCAL_STORAGE_KEY = 'sixday-dev-theme';

// นี่คือโค้ด JavaScript ที่จะถูกฝังใน <head>
const immediateScript = `
(function() {
  try {
    var theme = localStorage.getItem('${LOCAL_STORAGE_KEY}');
    var root = document.documentElement;
    
    if (theme) {
      // 1. ถ้ามีค่าใน localStorage (light/dark)
      root.classList.add(theme);
    } else {
      // 2. ถ้าไม่มี (เป็น 'system' หรือเข้าครั้งแรก)
      var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
      if (systemTheme.matches) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    }
  } catch (e) {
    console.warn('Failed to set initial theme:', e);
  }
})();
`;

export function ThemeScript() {
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: immediateScript }}
    />
  );
}