"use client";

// 📍 ที่อยู่ไฟล์: app/components/work/ProjectCard.tsx

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// (Animation Variants คงเดิม)
// --------------------------------------------------------------------------------
const categoryTextVariants = {
  initial: { y: 0, opacity: 1 },
  hover: { y: "-100%", opacity: 0 },
};
const showProjectTextVariants = {
  initial: { y: "100%", opacity: 0 },
  hover: { y: 0, opacity: 1 },
};
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// TAG: Types Definition
// --------------------------------------------------------------------------------

// TAG: (นี่คือ 'export' ที่เราแก้ไปครั้งก่อน - คงเดิม)
export type Project = {
  id: number;
  title: string;
  categoryKey: 'fullStack' | 'uiUx' | 'data'; // <-- Type ที่เจาะจง
  imageUrl: string; 
  projectUrl: string; 
};

// Type สำหรับคำแปล (คงเดิม)
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
  cardStyle: string;
}

// --------------------------------------------------------------------------------
// TAG: ProjectCard Component
// --------------------------------------------------------------------------------

const ProjectCard: React.FC<ProjectCardProps> = ({ project, tCard, cardStyle }) => {
  // TAG: [THE-FIX] (1/1) 📍📍📍 นี่คือจุดที่แก้ไข 📍📍📍
  // เราเพิ่ม 'as const' เพื่อบอก TypeScript ว่า "easeInOut" คือค่าคงที่
  const transition = { duration: 0.3, ease: "easeInOut" } as const; // <-- 📍 เพิ่มตรงนี้

  return (
    // TAG: (โค้ด <motion.a> ที่เราแก้ไปแล้ว - คงเดิม)
    <motion.a
      href={project.projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${cardStyle} relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg`}
      initial="initial"
      whileHover="hover"
      layout 
    >
      {/* TAG: Background Image (คงเดิม) */}
      <img
        src={project.imageUrl}
        alt={project.title}
        loading="lazy"
        className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
      />

      {/* TAG: Gradient Overlay (คงเดิม) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* TAG: Text Content (คงเดิม) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        
        <h3 className="text-xl md:text-2xl font-bold mb-1 truncate">
          {project.title}
        </h3>
        
        {/* TAG: Animated Text Container (The "Stage") (คงเดิม) */}
        <div className="relative h-6 overflow-hidden mt-2">
          
          {/* Text 1: Category (ที่แสดงผลตอนแรก) (คงเดิม) */}
          <motion.div
            className="absolute inset-0"
            variants={categoryTextVariants}
            transition={transition} // <-- (บรรทัด 93) ตอนนี้ถูกต้องแล้ว
          >
            <p className="text-sm md:text-base text-slate-200">
              {tCard.categories[project.categoryKey]}
            </p>
          </motion.div>

          {/* Text 2: Show Project (ที่แสดงตอน Hover) (คงเดิม) */}
          <motion.div
            className="absolute inset-0 flex items-center gap-2"
            variants={showProjectTextVariants}
            transition={transition} // <-- (ที่นี่ก็ใช้ 'transition' ที่เราแก้แล้ว)
          >
            <p className="text-sm md:text-base font-semibold">
              {tCard.showProject}
            </p>
            <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>
    </motion.a> 
  );
};

export default ProjectCard;