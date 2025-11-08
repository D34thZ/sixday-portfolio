/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {} // <--- ✅ นี่คือ Config ที่ถูกต้องสำหรับ v4
    
    // 'autoprefixer' ไม่จำเป็นต้องใส่อีกต่อไป
    // เพราะ @tailwindcss/postcss (v4) จัดการให้เราอัตโนมัติครับ
  },
}