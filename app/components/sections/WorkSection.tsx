"use client";

// TAG: [Component] WorkSection
// นี่คือ Component หลักสำหรับส่วน "Work"
// เราใช้ "use client" เพราะต้องใช้ useState สำหรับการ Filter

// TAG: [THE-FIX] (1/4) Import 'useState' และ 'useEffect'
import React, { useState, useEffect } from "react";
import ProjectCard from "../work/ProjectCard";

// TAG: [THE-FIX] (2/4) Import Spline แบบ Default (ไม่มีวงเล็บปีกกา)
// 📍 นี่คือบรรทัดที่แก้ไข 📍
// เราเปลี่ยนจาก { Spline } เป็น Spline (Default Import)
import Spline from "@splinetool/react-spline";

// (Mock Data ทั้งหมดคงเดิม... ผมย่อไว้เพื่อความกระชับ)
// --------------------------------------------------------------------------------
// TAG: Mock Data
// --------------------------------------------------------------------------------
const mockProjects = [
  // --- Pattern 1 (Index 0-4) ---
  {
    id: 1,
    title: "JOBESAN - เว็บแอปหางาน (React & Supabase)",
    categoryKey: "fullStack", // ใช้ 'fullStack', 'uiUx', หรือ 'data'
    // TAG: [Placeholder] รูปภาพการ์ด 1
    imageUrl: "images/job-details-page.jpg",
    projectUrl: "https://github.com/sixday-dev/jobesan-app-showcase" 
  },
  {
    id: 2,
    title: "ZEAL PROTECH - เว็บไซต์ Renewal (HTML/CSS/JS)",
    categoryKey: "uiUx",
    // TAG: [Placeholder] รูปภาพการ์ด 2
    imageUrl: "images/zeal-home-desktop.jpg",
    projectUrl: "https://github.com/sixday-dev/zeal-website-showcase"
  },
  {
    id: 3,
    title: "UDA Website - การยกเครื่อง UI/UX (React)",
    categoryKey: "uiUx",
    // TAG: [Placeholder] รูปภาพการ์ด 3
    imageUrl: "images/about-us-page.jpg",
    projectUrl: "https://github.com/sixday-dev/uda-website-showcase"
  },
  {
    // TAG: นี่คือการ์ดที่ 4 (index 3) ที่จะเป็นการ์ดใหญ่
    id: 4,
    title: "ZEAL Warranty - ระบบประกันและวิเคราะห์ข้อมูล (Data-Driven)",
    categoryKey: "data",
    // TAG: [Placeholder] รูปภาพการ์ด 4 (ใหญ่)
    imageUrl: "images/dashboard-qr-print.jpg",
    projectUrl: "https://github.com/sixday-dev/zeal-warranty-system"
  },
  {
    // TAG: นี่คือการ์ดที่ 5 (index 4) ที่จะอยู่ข้างการ์ดใหญ่ (แนวตั้ง)
    id: 5,
    title: "UD Auto Glass - ระบบจองคิวและ Dashboard (Full-Stack)",
    categoryKey: "fullStack",
    // TAG: [Placeholder] รูปภาพการ์ด 5
    imageUrl: "images/booking-step2-calendar.jpg",
    projectUrl: "https://github.com/sixday-dev/showcase-ud-auto-glass-UDG"
  },
  
  // --- Pattern 2 (Index 5-9) ---
  //{
  //  id: 6,
  //  title: "Project Zeta",
  //  categoryKey: "data",
    // TAG: [Placeholder] รูปภาพการ์ด 6
  //  imageUrl: "https://placehold.co/800x600/166534/FFFFFF?text=Project+Zeta",
  //},
  //{
  //  id: 7,
  //  title: "Project Eta",
  //  categoryKey: "fullStack",
    // TAG: [Placeholder] รูปภาพการ์ด 7
  //  imageUrl: "https://placehold.co/800x600/991B1B/FFFFFF?text=Project+Eta",
  //},
  //{
  //  id: 8,
  //  title: "Brand Identity 'Theta'",
  //  categoryKey: "uiUx",
    // TAG: [Placeholder] รูปภาพการ์ด 8
  //  imageUrl: "https://placehold.co/800x600/1D4ED8/FFFFFF?text=Project+Theta",
  //},
  //{
    // TAG: การ์ดที่ 9 (index 8) -> (index % 5) = 3 -> เป็นการ์ดใหญ่
  //  id: 9,
  //  title: "AI Analytics Tool",
  //  categoryKey: "data",
    // TAG: [Placeholder] รูปภาพการ์ด 9 (ใหญ่)
  //  imageUrl: "https://placehold.co/1200x675/7E22CE/FFFFFF?text=Project+Iota+(Large)",
  //},
  //{
    // TAG: การ์ดที่ 10 (index 9) -> (index % 5) = 4 -> เป็นการ์ดแนวตั้ง
  //  id: 10,
  //  title: "Project Kappa",
  //  categoryKey: "fullStack",
    // TAG: [Placeholder] รูปภาพการ์ด 10
  //  imageUrl: "https://placehold.co/600x800/B45309/FFFFFF?text=Project+Kappa",
  //},
];
// --------------------------------------------------------------------------------

// TAG: [THE-FIX] (1/2) สร้าง Type ที่แม่นยำสำหรับ 't' (t.work)
interface WorkTranslations {
  title: string;
  description: string;
  filters: {
    all: string;
    fullStack: string;
    uiUx: string;
    data: string;
  };
  card: {
    showProject: string;
    categories: {
      fullStack: string;
      uiUx: string;
      data: string;
    };
  };
}

// (Interface และ filterCategories คงเดิม)
interface WorkSectionProps {
  t: WorkTranslations; // <-- เปลี่ยนจาก 'any'
  // locale: string; // <-- 'locale' ถูกลบออก เพราะ Vercel แจ้งว่าไม่ได้ใช้
}
const filterCategories = ["all", "fullStack", "uiUx", "data"];

// TAG: [THE-FIX] (2/2) ลบ 'locale' ออกจาก props (เพราะ Vercel แจ้งว่าไม่ได้ใช้)
const WorkSection: React.FC<WorkSectionProps> = ({ t }) => {
  // (State และ Logic การ Filter คงเดิม)
  const [activeFilter, setActiveFilter] = useState("all");

  // TAG: [THE-FIX] (3/4) สร้าง State 'isClient' (คงเดิม)
  const [isClient, setIsClient] = useState(false);

  // useEffect (คงเดิม)
  useEffect(() => {
    setIsClient(true);
  }, []); 

  
  const filteredProjects =
    activeFilter === "all"
      ? mockProjects
      : mockProjects.filter((p) => p.categoryKey === activeFilter);
  
  const tWork = t;

  return (
    <section 
      id="work" 
      className="py-24 md:py-32 scroll-mt-24"
    >
      <div className="container mx-auto px-4 md:px-8">
        
        {/* ----------------------------------- */}
        {/* TAG: Row 1: Header & 3D Model      */}
        {/* ----------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
          
          {/* Column 1: Text Content (คงเดิม) */}
          <div className="text-slate-900 dark:text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {tWork.title}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {tWork.description}
            </p>
          </div>

          {/* TAG: [THE-FIX] (4/4) Column 2: Spline 3D Model (คงเดิม) */}
          {/* ส่วนนี้จะทำงานถูกต้องแล้ว เพราะตอนนี้ 'Spline' เป็น Component ที่ถูกต้อง (ไม่ 'undefined') */}
          <div className="
            w-full h-[400px] md:h-full md:min-h-[450px] 
            rounded-2xl overflow-hidden
          ">
            {isClient ? (
              // นี่คือ Component ฝั่ง Client
              <Spline
                scene="https://prod.spline.design/EKRHHTipp0MXQQgx/scene.splinecode" 
              />
            ) : (
              // นี่คือ Placeholder ที่จะแสดงผลตอน Server Render
              <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                Loading 3D Model...
              </div>
            )}
          </div>
        </div>

        {/* ----------------------------------- */}
        {/* TAG: Row 2: Filters & Grid (คงเดิม) */}
        {/* ----------------------------------- */}
        
        {/* Sub-row 1: Filter Buttons (คงเดิม) */}
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
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
                  }
                `}
              >
                {tWork.filters[key]}
              </button>
            );
          })}
        </div>

        {/* Sub-row 2: Abstract Project Grid (คงเดิม) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            
            const patternIndex = index % 5;
            
            let cardStyle = "col-span-1 aspect-[4/3]"; 

            if (patternIndex === 3) {
              cardStyle = "md:col-span-2 aspect-video";
            } else if (patternIndex === 4) {
              cardStyle = "col-span-1 aspect-[3/4]";
            }
            
            return (
              <ProjectCard
                key={project.id}
                project={project}
                tCard={tWork.card}
                cardStyle={cardStyle}
              />
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default WorkSection;