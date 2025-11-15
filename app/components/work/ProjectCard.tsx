"use client";

// TAG: [Component] ProjectCard
// นี่คือ Component ลูกสำหรับการ์ดแต่ละใบใน Work Section
// เราใช้ "use client" เพราะต้องใช้ Framer Motion สำหรับ Hover Animation

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// NOTE: เราจะใช้ <img> tag ธรรมดา (ไม่ใช่ Next/Image)
// เพื่อหลีกเลี่ยงปัญหา Build Error ที่อาจเกิดขึ้น (ตามบริบทก่อนหน้า)

// --------------------------------------------------------------------------------
// TAG: Animation Variants
// นี่คือชุดคำสั่งสำหรับ Framer Motion
// --------------------------------------------------------------------------------

// Variants สำหรับ "Category" (ข้อความที่แสดงตอนแรก)
const categoryTextVariants = {
  initial: { y: 0, opacity: 1 }, // สถานะปกติ: อยู่ที่เดิม (y: 0)
  hover: { y: "-100%", opacity: 0 }, // สถานะ Hover: เลื่อนขึ้นจนสุด (y: -100%)
};

// Variants สำหรับ "Show Project" (ข้อความที่แสดงตอน Hover)
const showProjectTextVariants = {
  initial: { y: "100%", opacity: 0 }, // สถานะปกติ: ซ่อนอยู่ข้างล่าง (y: 100%)
  hover: { y: 0, opacity: 1 }, // สถานะ Hover: เลื่อนขึ้นมาแทนที่ (y: 0)
};

// --------------------------------------------------------------------------------
// TAG: Types Definition
// --------------------------------------------------------------------------------

// Type สำหรับข้อมูล Project (จาก Mock Data)
type Project = {
  id: number;
  title: string;
  categoryKey: 'fullStack' | 'uiUx' | 'data'; // Key สำหรับดึงคำแปล
  // TAG: [Placeholder] นี่คือจุดที่ระบุ URL ของรูปภาพ
  imageUrl: string; 
  // TAG: [THE-FIX] (1/3) อัปเดต Type ให้รู้จัก projectUrl
  projectUrl: string; 
};

// Type สำหรับคำแปลที่รับมาจาก WorkSection (t.card)
type CardTranslations = {
  showProject: string;
  categories: {
    fullStack: string;
    uiUx: string;
    data: string;
  };
};

interface ProjectCardProps {
  project: Project;
  tCard: CardTranslations;
  cardStyle: string; // คลาส CSS สำหรับกำหนดขนาด Grid (เช่น 'col-span-1' หรือ 'md:col-span-2')
}

// --------------------------------------------------------------------------------
// TAG: ProjectCard Component
// --------------------------------------------------------------------------------

const ProjectCard: React.FC<ProjectCardProps> = ({ project, tCard, cardStyle }) => {
  // กำหนดค่ำ transition ให้เหมือนกัน
  const transition = { duration: 0.3, ease: "easeInOut" };

  return (
    // TAG: [THE-FIX] (2/3) 
    // - เปลี่ยนจาก <motion.div> เป็น <motion.a> (แท็กลิงก์)
    // - เพิ่ม href, target, และ rel
    <motion.a
      href={project.projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardStyle} relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg`}
      initial="initial"
      whileHover="hover"
      layout // ให้ Framer Motion จัดการการเปลี่ยนแปลงขนาด (ถ้ามี)
    >
      {/* TAG: Background Image */}
      {/* TAG: [Placeholder] รูปภาพ Cover ของโปรเจกต์ */}
      <img
        src={project.imageUrl}
        alt={project.title}
        loading="lazy"
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* TAG: Gradient Overlay */}
      {/* Overlay ไล่สีดำจางๆ จากล่างขึ้นบน เพื่อให้ข้อความอ่านง่ายขึ้น */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* TAG: Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        
        {/* TAG: [Placeholder] Title หัวข้อของโปรเจกต์ */}
        <h3 className="text-xl md:text-2xl font-bold mb-1 truncate">
          {project.title}
        </h3>
        
        {/* TAG: Animated Text Container (The "Stage")
          นี่คือกล่องที่เป็น "เวที" สำหรับสลับ Animation
          - "relative" เพื่อให้ลูกๆ "absolute" ได้
          - "h-6" (กำหนดความสูงคงที่)
          - "overflow-hidden" (ซ่อนทุกอย่างที่ล้นกรอบ)
        */}
        <div className="relative h-6 overflow-hidden mt-2">
          
          {/* Text 1: Category (ที่แสดงผลตอนแรก) */}
          <motion.div
            className="absolute inset-0"
            variants={categoryTextVariants}
            transition={transition}
          >
            {/* TAG: [Placeholder] Sub-title (Category) */}
            <p className="text-sm md:text-base text-slate-200">
              {/* ดึงคำแปล Category จาก tCard.categories โดยใช้ project.categoryKey */}
              {tCard.categories[project.categoryKey]}
            </p>
          </motion.div>

          {/* Text 2: Show Project (ที่แสดงตอน Hover) */}
          <motion.div
            className="absolute inset-0 flex items-center gap-2"
            variants={showProjectTextVariants}
            transition={transition}
          >
            {/* TAG: [Placeholder] ข้อความ Show Project */}
            <p className="text-sm md:text-base font-semibold">
              {tCard.showProject}
            </p>
            <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>
    </motion.a> // <-- TAG: [THE-FIX] (3/3) ปิดด้วย </motion.a>
  );
};

export default ProjectCard;