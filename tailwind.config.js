// 📍 ที่อยู่ไฟล์: tailwind.config.js
// (นี่คือ Config ที่ V3 อ่านได้สมบูรณ์)

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  
  // * TAG: [V3-Test]
  // * ใช้ content path ที่เจาะจงที่สุด
  content: [
    './app/[locale]/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/contexts/**/*.{js,ts,jsx,tsx,mdx}',
    './app/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {},
  },
  plugins: [],
};