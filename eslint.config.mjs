import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  
  // --- TAG: [THE-FIX] (1/1) ------------------------------
  // นี่คือการ "ปิด" คำเตือนเรื่อง <img> (no-img-element)
  // เราเพิ่ม Object ใหม่นี้เข้าไปใน Array
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  // --- จบการแก้ไข --------------------------------------
];

export default eslintConfig;