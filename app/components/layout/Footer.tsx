"use client";

// TAG: [Component] Footer
// นี่คือ Component สำหรับ Footer ที่จะอยู่ด้านล่างสุดของหน้า

import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <motion.footer
      className="
        w-full py-8 text-center 
        bg-transparent border-t border-gray-200/50 dark:border-slate-700/50
        text-gray-600 dark:text-gray-400 text-sm
      "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <p>&copy; 2025 Kritsada Khunon. All Rights Reserved.</p>
    </motion.footer>
  );
};

export default Footer;