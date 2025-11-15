"use client";

// 📍 ที่อยู่ไฟล์: app/components/sections/WorkSection.tsx

import React, { useState, useEffect } from "react";

// TAG: [THE-FIX] (1/3) 📍📍📍 นี่คือจุดที่แก้ไข (จุดที่ 1) 📍📍📍
// Import 'ProjectCard' (Default) และ 'Project' (Type)
import ProjectCard, { type Project } from "../work/ProjectCard"; 
import Spline from "@splinetool/react-spline";

// --------------------------------------------------------------------------------
// TAG: Mock Data
// --------------------------------------------------------------------------------

// TAG: [THE-FIX] (2/3) 📍📍📍 นี่คือจุดที่แก้ไข (จุดที่ 2) 📍📍📍
// เรากำหนด Type 'Project[]' ให้กับ Array นี้
const mockProjects: Project[] = [
  // --- Pattern 1 (Index 0-4) ---
  {
    id: 1,
    title: "JOBESAN - เว็บแอปหางาน (React & Supabase)",
    categoryKey: "fullStack", // <-- (ตอนนี้ TypeScript ตรวจสอบแล้วว่า 'fullStack' ถูกต้อง)
    imageUrl: "images/job-details-page.jpg",
    projectUrl: "https://github.com/sixday-dev/jobesan-app-showcase" 
  },
  {
    id: 2,
    title: "ZEAL PROTECH - เว็บไซต์ Renewal (HTML/CSS/JS)",
    categoryKey: "uiUx", // <-- (ถูกต้อง)
    imageUrl: "images/zeal-home-desktop.jpg",
    projectUrl: "https://github.com/sixday-dev/zeal-website-showcase"
  },
  {
    id: 3,
    title: "UDA Website - การยกเครื่อง UI/UX (React)",
    categoryKey: "uiUx", // <-- (ถูกต้อง)
    imageUrl: "images/about-us-page.jpg",
    projectUrl: "https://github.com/sixday-dev/uda-website-showcase"
  },
  {
    id: 4,
    title: "ZEAL Warranty - ระบบประกันและวิเคราะห์ข้อมูล (Data-Driven)",
    categoryKey: "data", // <-- (ถูกต้อง)
    imageUrl: "images/dashboard-qr-print.jpg",
    projectUrl: "https://github.com/sixday-dev/zeal-warranty-system"
  },
  {
    id: 5,
    title: "UD Auto Glass - ระบบจองคิวและ Dashboard (Full-Stack)",
    categoryKey: "fullStack", // <-- (ถูกต้อง)
    imageUrl: "images/booking-step2-calendar.jpg",
    projectUrl: "https://github.com/sixday-dev/showcase-ud-auto-glass-UDG"
  },
  
  // (Mock Data ที่เหลือ (ที่คอมเมนต์ไว้) คงเดิม)
  //{
  //  ...
  //},
];
// --------------------------------------------------------------------------------

// (Interface WorkTranslations ที่เราแก้ไปแล้ว - คงเดิม)
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

// (Type FilterKey ที่เราแก้ไปแล้ว - คงเดิม)
type FilterKey = keyof WorkTranslations['filters'];


interface WorkSectionProps {
  t: WorkTranslations;
}

// (const filterCategories ที่เราแก้ไปแล้ว - คงเดิม)
const filterCategories: FilterKey[] = ["all", "fullStack", "uiUx", "data"];

const WorkSection: React.FC<WorkSectionProps> = ({ t }) => {
  // (State, useEffect, filteredProjects, tWork - คงเดิม)
  const [activeFilter, setActiveFilter] = useState("all");
  const [isClient, setIsClient] = useState(false);

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
        
        {/* (Row 1: Header & 3D Model - คงเดิม) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
          
          <div className="text-slate-900 dark:text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {tWork.title}
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {tWork.description}
            </p>
          </div>

          <div className="
            w-full h-[400px] md:h-full md:min-h-[450px] 
            rounded-2xl overflow-hidden
          ">
            {isClient ? (
              <Spline
                scene="https://prod.spline.design/EKRHHTipp0MXQQgx/scene.splinecode" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                Loading 3D Model...
              </div>
            )}
          </div>
        </div>

        {/* (Row 2: Filters - คงเดิม) */}
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

        {/* (Row 3: Abstract Project Grid - คงเดิม) */}
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
              // TAG: [THE-FIX] (3/3) 📍📍📍 นี่คือจุดที่แก้ไข (จุดที่ 3) 📍📍📍
              // 'project' (ที่ส่งเข้าไป) ตอนนี้มี Type ที่ถูกต้องแล้ว
              // Error 'Type error' จะหายไป
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