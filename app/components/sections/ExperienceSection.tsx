"use client";

// TAG: [Component] ExperienceSection
// นี่คือ Component หลักสำหรับส่วน "Experience"
// เราใช้ "use client" เพราะต้องใช้ useState (สำหรับเปิด/ปิด)
// และ Framer Motion (สำหรับ Animation)

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Globe, Plus, Minus } from "lucide-react";

// --------------------------------------------------------------------------------
// TAG: Animation Variants
// --------------------------------------------------------------------------------
const contentVariants = {
  // สถานะ "พับเก็บ" (collapsed)
  collapsed: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  // สถานะ "ขยาย" (open)
  open: {
    height: "auto", // ขยายตามความสูงเนื้อหา
    opacity: 1,
    marginTop: "1rem", // เว้นระยะห่างจากแถบ Header
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// --------------------------------------------------------------------------------
// TAG: Types Definition
// --------------------------------------------------------------------------------

// Type สำหรับ Props ที่รับมาจาก page.tsx (t.experience)
interface ExperienceSectionProps {
  t: {
    title: string;
    items: ExperienceItemProps[];
  };
  locale: string;
}

// Type สำหรับข้อมูลแต่ละรายการ
interface ExperienceItemProps {
  title: string;
  years: string;
  location: string;
  domain: string;
  description: string;
  tech: string[];
  logoUrl: string;
}

// --------------------------------------------------------------------------------
// TAG: ExperienceSection Component
// --------------------------------------------------------------------------------

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ t, locale }) => {
  // State สำหรับเก็บ Index ของแถบที่กำลังเปิดอยู่ (null = ปิดทั้งหมด)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Function สำหรับสลับการเปิด/ปิด
  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // TAG: Section Wrapper
    // เราย้าย id="experience" มาไว้ที่นี่
    // และใช้ mb-32 เหมือน Section อื่นๆ
    <section id="experience" className="mb-32 scroll-mt-24">
      
      {/* TAG: Row 1: Title (My Journey / เส้นทางของผม) */}
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-12 text-center">
        {t.title}
      </h2>

      {/* TAG: Row 2: Accordion List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {/* วน Loop ข้อมูล 4 รายการที่ส่งมาจาก page.tsx */}
        {t.items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="overflow-hidden">
              
              {/* TAG: Accordion Header (แถบสีหลัก) */}
              <div
                onClick={() => toggleItem(index)}
                className={`
                  flex justify-between items-center p-6 
                  bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm 
                  border border-gray-200 dark:border-slate-700 shadow-lg
                  cursor-pointer transition-all duration-300
                  ${isOpen 
                    ? "rounded-t-2xl" // ถ้าเปิด, ทำให้มนแค่ด้านบน
                    : "rounded-2xl hover:shadow-xl" // ถ้าปิด, ทำให้มนทั้งหมด
                  }
                `}
              >
                {/* Col 1: Title (หัวข้อด้านซ้าย) */}
                <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                
                {/* Col 2: Year & Icon (ปี และ +/--) */}
                <div className="flex items-center gap-4">
                  <span className="text-sm md:text-base font-medium text-blue-600 dark:text-blue-400">
                    {item.years}
                  </span>
                  {/* สลับไอคอน + / - ตามสถานะ isOpen */}
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                  ) : (
                    <Plus className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                  )}
                </div>
              </div>

              {/* TAG: Accordion Content (แถบสีย่อยที่ขยาย/พับ) */}
              {/* AnimatePresence ใช้สำหรับจัดการ Animation ตอน "พับเก็บ" (Exit) */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={contentVariants}
                    className="
                      bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                      border-x border-b border-gray-200 dark:border-slate-700
                      rounded-b-2xl shadow-inner
                    "
                  >
                    {/* ใช้ Flexbox สำหรับแบ่ง 2 Columns (80/20) */}
                    <div className="flex flex-col md:flex-row p-6">
                      
                      {/* --- Column 1 (80%) --- */}
                      <div className="w-full md:w-4/5 md:pr-6 space-y-4">
                        
                        {/* Row 1: Location & Domain */}
                        <div className="flex flex-col sm:flex-row gap-4 text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-blue-500" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-blue-500" />
                            <a 
                              href={`https://${item.domain}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {item.domain}
                            </a>
                          </div>
                        </div>

                        {/* Row 2: Description */}
                        <p className="text-base text-slate-700 dark:text-slate-200">
                          {item.description}
                        </p>

                        {/* Row 3: Tech Stack (พื้นหลังวงรี) */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {item.tech.map((skill) => (
                            <span 
                              key={skill}
                              className="
                                bg-blue-100 text-blue-800 
                                dark:bg-blue-900/50 dark:text-blue-200
                                rounded-full px-3 py-1 text-xs font-medium
                              "
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* --- Column 2 (20%) --- */}
                      <div className="w-full md:w-1/5 mt-6 md:mt-0 flex items-center justify-center">
                        {/* TAG: [Placeholder] รูปภาพโลโก้บริษัท */}
                        <img
                          src={item.logoUrl}
                          alt={`${item.title} Logo`}
                          className="h-20 w-20 object-contain rounded-lg bg-white p-2 shadow-md dark:bg-slate-700"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExperienceSection;