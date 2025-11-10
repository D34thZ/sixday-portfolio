"use client";

// TAG: [Component] WorkSection
// นี่คือ Component หลักสำหรับส่วน "Work"
// เราใช้ "use client" เพราะต้องใช้ useState สำหรับการ Filter

import React, { useState } from "react";
import ProjectCard from "../work/ProjectCard";

// --------------------------------------------------------------------------------
// TAG: Mock Data
// ข้อมูลจำลองสำหรับโปรเจกต์ 10 รายการตามที่คุณขอ
// --------------------------------------------------------------------------------
const mockProjects = [
  // --- Pattern 1 (Index 0-4) ---
  {
    id: 1,
    title: "Project Alpha",
    categoryKey: "fullStack", // ใช้ 'fullStack', 'uiUx', หรือ 'data'
    // TAG: [Placeholder] รูปภาพการ์ด 1
    imageUrl: "https://placehold.co/800x600/1E40AF/FFFFFF?text=Project+Alpha", 
  },
  {
    id: 2,
    title: "Brand Redesign 'B'",
    categoryKey: "uiUx",
    // TAG: [Placeholder] รูปภาพการ์ด 2
    imageUrl: "https://placehold.co/800x600/BE185D/FFFFFF?text=Project+Beta",
  },
  {
    id: 3,
    title: "Data Insights Platform",
    categoryKey: "data",
    // TAG: [Placeholder] รูปภาพการ์ด 3
    imageUrl: "https://placehold.co/800x600/047857/FFFFFF?text=Project+Gamma",
  },
  {
    // TAG: นี่คือการ์ดที่ 4 (index 3) ที่จะเป็นการ์ดใหญ่
    id: 4,
    title: "Enterprise SaaS Solution",
    categoryKey: "fullStack",
    // TAG: [Placeholder] รูปภาพการ์ด 4 (ใหญ่)
    imageUrl: "https://placehold.co/1200x675/9A3412/FFFFFF?text=Project+Delta+(Large)",
  },
  {
    // TAG: นี่คือการ์ดที่ 5 (index 4) ที่จะอยู่ข้างการ์ดใหญ่ (แนวตั้ง)
    id: 5,
    title: "Mobile App 'Epsilon'",
    categoryKey: "uiUx",
    // TAG: [Placeholder] รูปภาพการ์ด 5
    imageUrl: "https://placehold.co/600x800/581C87/FFFFFF?text=Project+Epsilon",
  },
  
  // --- Pattern 2 (Index 5-9) ---
  {
    id: 6,
    title: "Project Zeta",
    categoryKey: "data",
    // TAG: [Placeholder] รูปภาพการ์ด 6
    imageUrl: "https://placehold.co/800x600/166534/FFFFFF?text=Project+Zeta",
  },
  {
    id: 7,
    title: "Project Eta",
    categoryKey: "fullStack",
    // TAG: [Placeholder] รูปภาพการ์ด 7
    imageUrl: "https://placehold.co/800x600/991B1B/FFFFFF?text=Project+Eta",
  },
  {
    id: 8,
    title: "Brand Identity 'Theta'",
    categoryKey: "uiUx",
    // TAG: [Placeholder] รูปภาพการ์ด 8
    imageUrl: "https://placehold.co/800x600/1D4ED8/FFFFFF?text=Project+Theta",
  },
  {
    // TAG: การ์ดที่ 9 (index 8) -> (index % 5) = 3 -> เป็นการ์ดใหญ่
    id: 9,
    title: "AI Analytics Tool",
    categoryKey: "data",
    // TAG: [Placeholder] รูปภาพการ์ด 9 (ใหญ่)
    imageUrl: "https://placehold.co/1200x675/7E22CE/FFFFFF?text=Project+Iota+(Large)",
  },
  {
    // TAG: การ์ดที่ 10 (index 9) -> (index % 5) = 4 -> เป็นการ์ดแนวตั้ง
    id: 10,
    title: "Project Kappa",
    categoryKey: "fullStack",
    // TAG: [Placeholder] รูปภาพการ์ด 10
    imageUrl: "https://placehold.co/600x800/B45309/FFFFFF?text=Project+Kappa",
  },
];
// --------------------------------------------------------------------------------

// Type ของ Props ที่รับมาจาก page.tsx
interface WorkSectionProps {
  t: any; // รับ t (translation object) ทั้งก้อน (t.work)
  locale: string;
}

// NOTE: Key ของ Filter ต้องตรงกับ 'all' หรือ categoryKey ใน mockProjects
const filterCategories = ["all", "fullStack", "uiUx", "data"];

const WorkSection: React.FC<WorkSectionProps> = ({ t, locale }) => {
  // State สำหรับเก็บ Filter ที่กำลัง Active
  const [activeFilter, setActiveFilter] = useState("all");

  // Logic การ Filter:
  // ถ้า activeFilter คือ 'all' ให้แสดง mockProjects ทั้งหมด
  // ถ้าไม่ใช่ ให้ .filter() เฉพาะอันที่ categoryKey ตรงกัน
  const filteredProjects =
    activeFilter === "all"
      ? mockProjects
      : mockProjects.filter((p) => p.categoryKey === activeFilter);
  
  // ดึง t object สำหรับ Work Section มาใช้งาน (t ที่รับมาคือ t.work จาก page.tsx)
  const tWork = t;

  return (
    // TAG: Section Wrapper
    // ใช้ padding แบบเดียวกับ Expertise (py-24 md:py-32) และ scroll-mt-24
    <section 
      id="work" 
      className="py-24 md:py-32 scroll-mt-24"
    >
      {/* ใช้ Container แบบเดียวกับ Section อื่นๆ */}
      <div className="container mx-auto px-4 md:px-8">
        
        {/* ----------------------------------- */}
        {/* TAG: Row 1: Header & Video         */}
        {/* ----------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
          
          {/* Column 1: Text Content */}
          <div className="text-slate-900 dark:text-white">
            {/* TAG: [Placeholder] Row 1 / Col 1 / Row 1 (Title) */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {tWork.title}
            </h2>
            {/* TAG: [Placeholder] Row 1 / Col 1 / Row 2 (Description) */}
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {tWork.description}
            </p>
          </div>

          {/* Column 2: Video Placeholder */}
          <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400">
            {/* TAG: [Placeholder] Row 1 / Col 2 (Video .mp4) */}
            <p className="font-medium">Video Placeholder (.mp4)</p>
          </div>
        </div>

        {/* ----------------------------------- */}
        {/* TAG: Row 2: Filters & Grid         */}
        {/* ----------------------------------- */}
        
        {/* Sub-row 1: Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12">
          {filterCategories.map((key) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`
                  px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300
                  ${isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' // Active Style
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700' // Inactive Style
                  }
                `}
              >
                {/* TAG: [Placeholder] Row 2 / Row 1 (Filter Buttons) */}
                {/* ดึงคำแปลของปุ่ม Filter จาก tWork.filters */}
                {tWork.filters[key]}
              </button>
            );
          })}
        </div>

        {/* Sub-row 2: Abstract Project Grid */}
        {/* นี่คือ Grid ที่มีการจัดเรียงแบบ Abstract
          - md:grid-cols-3 (3 คอลัมน์บนจอใหญ่)
          - gap-6 (เว้นวรรคระหว่างการ์ด)
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            
            // TAG: Abstract Grid Logic
            // เราใช้ "modulo" (index % 5) เพื่อหาตำแหน่งใน Pattern (0-4)
            // Pattern ของเราคือ [small, small, small, large, small]
            const patternIndex = index % 5;
            
            let cardStyle = "col-span-1 aspect-[4/3]"; // Default: การ์ดเล็ก (4:3)
                                                        // (index 0, 1, 2)

            if (patternIndex === 3) {
              // NOTE: นี่คือการ์ดตำแหน่งที่ 4 (index 3) ใน Pattern
              // เราจะให้มัน "ใหญ่" โดยการขยาย 2 คอลัมน์ (md:col-span-2)
              // และเปลี่ยนอัตราส่วนเป็น 16:9 (aspect-video)
              cardStyle = "md:col-span-2 aspect-video";
            } else if (patternIndex === 4) {
              // NOTE: การ์ดตำแหน่งที่ 5 (index 4)
              // เป็นการ์ดเล็ก แต่เราเปลี่ยนอัตราส่วนเป็น 3:4 (แนวตั้ง) เพื่อความหลากหลาย
              cardStyle = "col-span-1 aspect-[3/4]";
            }
            
            return (
              <ProjectCard
                key={project.id}
                project={project}
                tCard={tWork.card} // ส่งเฉพาะ t.work.card ลงไป
                cardStyle={cardStyle} // ส่งคลาสที่คำนวณได้ลงไป
              />
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default WorkSection;