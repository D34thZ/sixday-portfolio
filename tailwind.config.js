// 📍 ที่อยู่ไฟล์: tailwind.config.js
// (ฉบับสมบูรณ์และถูกต้อง)

/** @type {import('tailwindcss').Config} */
module.exports = {
  // * TAG: [Fix-Dark-Mode-CSS]
  // * 1. นี่คือบรรทัดที่ "สำคัญที่สุด"
  // * 2. มันบอก Tailwind ให้มองหา "class='dark'" ที่ <html>
  darkMode: 'class',
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};