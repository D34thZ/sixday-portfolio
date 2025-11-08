'use client';

import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion'; // <-- (Opening Tag)

export function LanguageToggle() {
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = params.locale as string; 
  const otherLocale = currentLocale === 'th' ? 'en' : 'th';
  const newPath = pathname.replace(`/${currentLocale}`, `/${otherLocale}`);

  // TAG: [Fix-Milestone-2-FINAL] (คงเดิม) ลบ 'locale' prop ที่ไม่รองรับ
  return (
    <Link href={newPath}> 
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs 
                   bg-card-light dark:bg-card-dark 
                   text-secondary-light dark:text-secondary-dark 
                   hover:text-primary-light dark:hover:text-primary-dark 
                   transition-all duration-200"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentLocale}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="uppercase" 
          >
            {otherLocale}
          </motion.span>
        </AnimatePresence> {/* <-- TAG: [Fix-Milestone-2-TYPO-FIX] (Closing Tag) แก้ตัวสะกดที่นี่ */ }
      </div>
    </Link>
  );
}