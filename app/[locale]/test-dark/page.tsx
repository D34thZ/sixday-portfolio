// 📍 ที่อยู่ไฟล์: app/[locale]/test-dark/page.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function DarkModeTest() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlHasDark, setHtmlHasDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // ตรวจสอบทุก 100ms
    const interval = setInterval(() => {
      const hasDark = document.documentElement.classList.contains('dark');
      setHtmlHasDark(hasDark);
      console.log('🔍 HTML has dark class:', hasDark);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null; // (รอจนกว่าจะ mount)

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 transition-colors pt-40"> {/* (เพิ่ม pt-40 เพื่อหลบ Navbar) */}
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          🔍 Dark Mode Diagnostic
        </h1>

        {/* Status Cards */}
        <div className="grid gap-4">
          <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              Current Theme (from hook)
            </p>
            <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              {theme}
            </p>
          </div>

          <div className={`p-4 rounded-lg ${htmlHasDark ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              HTML Element has 'dark' class
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {htmlHasDark ? '✅ YES' : '❌ NO'}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-purple-100 dark:bg-purple-900">
            <p className="text-sm font-semibold text-purple-800 dark:text-purple-200">
              This card background color
            </p>
            <p className="text-base text-purple-900 dark:text-purple-100">
              If you see purple (light mode) or dark purple (dark mode), it works!
            </p>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setTheme('light')}
            className="px-6 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500
                       text-gray-900 font-semibold transition-colors"
          >
            ☀️ Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700
                       text-white font-semibold transition-colors"
          >
            🌙 Dark
          </button>
          <button
            onClick={() => setTheme('system')}
            className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600
                       text-white font-semibold transition-colors"
          >
            💻 System
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            📋 What to check:
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Click the buttons above</li>
            <li>Check if "HTML Element has 'dark' class" shows ✅ YES when dark mode</li>
            <li>Check if card colors change</li>
            <li>Open DevTools → Console → Look for 🔍 messages</li>
            <li>Open DevTools → Elements → Find {'<html>'} tag → Should see class="dark"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}