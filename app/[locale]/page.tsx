// 📍 ที่อยู่ไฟล์: app/[locale]/page.tsx
'use client'; 

import { useParams } from 'next/navigation';
import HeroHeader from "../components/sections/HeroHeader";

// TAG: [Expertise-Icons] (1)
// (IconReact, IconDesign, IconStrategy คงเดิม)
const IconReact = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" {...props}>
    <title>React Logo</title>
    <circle cx="0" cy="0" r="2.05" fill="currentColor"></circle>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse>
    </g>
  </svg>
);

const IconDesign = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);

const IconStrategy = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625C9.75 8.004 10.254 7.5 10.875 7.5h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 9.75 19.875V8.625ZM16.5 4.125C16.5 3.504 17.004 3 17.625 3h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 16.5 19.875V4.125Z" />
  </svg>
);

// TAG: [Request 3a]
// เปลี่ยนไอคอน 'IconSecret' เป็น 'IconCode' (มงกุฎ)
const IconCode = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0-4.5 9" />
  </svg>
);

// TAG: [Expertise-Data] (2)
// (Content EN และ TH คงเดิม)
const enContent = {
  expertise: {
    title: "My Expertise",
    subtitle: "My capabilities aren't just limited to code. I combine strategic development with over a decade of design experience to build solutions that are not only functional, but also beautiful and business-driven.",
    cards: [
      {
        icon: IconReact,
        title: "Full-Stack Development",
        sub: "React, Next.js",
        desc: "Over 5 years of experience in building modern, high-performance web applications. Deep experience with JavaScript, TypeScript, React, Next.js, and integrating backend services like Firebase, Supabase, and PostgreSQL."
      },
      {
        icon: IconDesign,
        title: "Graphic Design & UI/UX",
        sub: "11+ Years of Experience",
        desc: "A designer's eye with a developer's mind. Over a decade of professional experience in branding, visual identity, and creating intuitive, beautiful user interfaces (UI/UX)."
      },
      {
        icon: IconStrategy,
        title: "Digital Strategy & Data",
        sub: "Business-Driven Solutions",
        desc: "Building software is not just about code; it's about solving real-world business problems. 4+ years of experience in digital marketing, data analysis, and developing solutions that deliver measurable results."
      }
    ]
  }
};

const thContent = {
  expertise: {
    title: "ความเชี่ยวชาญของผม",
    subtitle: "ความสามารถของผมไม่ได้จำกัดอยู่แค่การเขียนโค้ด แต่คือการผสมผสานการพัฒนาเชิงกลยุทธ์เข้ากับประสบการณ์ด้านการออกแบบกว่าทศวรรษ เพื่อสร้างโซลชันที่ไม่เพียงแค่ทำงานได้ แต่ยังสวยงามและตอบโจทย์ทางธุรกิจอีกด้วย",
    cards: [
      {
        icon: IconReact,
        title: "การพัฒนาแบบ Full-Stack",
        sub: "React, Next.js",
        desc: "ประสบการณ์มากกว่า 5 ปี ในการสร้างเว็บแอปพลิเคชันสมัยใหม่ประสิทธิภาพสูง มีประสบการณ์ลึกซึ้งกับ JavaScript, TypeScript, React, Next.js และการเชื่อมต่อบริการ Backend อย่าง Firebase, Supabase และ PostgreSQL"
      },
      {
        icon: IconDesign,
        title: "การออกแบบกราฟิก & UI/UX",
        sub: "ประสบการณ์มากกว่า 11 ปี",
        desc: "มองปัญหาด้วยสายตาของดีไซเนอร์ แก้ปัญหาด้วยสมองของนักพัฒนา ประสบการณ์กว่าทศวรรษในการสร้างแบรนด์, อัตลักษณ์องค์กร (Branding) และการออกแบบ User Interface (UI/UX) ที่สวยงามและใช้งานง่าย"
      },
      {
        icon: IconStrategy,
        title: "กลยุทธ์ดิจิทัล & ข้อมูล",
        sub: "โซลูชันที่ขับเคลื่อนด้วยธุรกิจ",
        desc: "การสร้างซอฟต์แวร์ไม่ใช่แค่การเขียนโค้ด แต่คือการแก้ปัญหาทางธุรกิจในโลกแห่งความเป็นจริง ประสบการณ์มากกว่า 4 ปี ด้านการตลาดดิจิทัล, การวิเคราะห์ข้อมูล และการพัฒนาโซลูชันที่สร้างผลลัพธ์ที่วัดผลได้จริง"
      }
    ]
  }
};


export default function HomePage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = locale === 'th' ? thContent : enContent;
  
  // TAG: [Request 3b]
  // เปลี่ยน Icon เป็น IconCrown
  // เปลี่ยน Title เป็น "My Expertise" / "ความเชี่ยวชาญของผม"
  const secretCard = {
    icon: IconCode,
    title: locale === 'th' ? "ความเชี่ยวชาญของผม" : "My Expertise",
    sub: locale === 'th' ? "จุดที่โค้ดบรรจบกับดีไซน์และกลยุทธ์" : "Where Code Meets Design & Strategy",
    desc: t.expertise.subtitle 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
      
      <div className="pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          <HeroHeader />

          {/* * =============================================
            * 🚀 ภารกิจ C: "รื้อสร้าง" Section Expertise
            * =============================================
            */}
          
          {/* TAG: [Request 4] */}
          {/* เพิ่มความสูง Section โดยเปลี่ยนจาก py-24 เป็น py-32 */}
          <section id="expertise" className="relative py-56 overflow-hidden">
            
            {/* TAG: [Expertise-BG] (8) */}
            {/* (ส่วนนี้คงเดิม 100% ตามไฟล์ที่คุณส่งมา) */}
            <div 
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: "url('/images/code-bg-light.png')",
                backgroundPosition: 'bottom center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '600px auto'
              }}
            />

            {/* TAG: [Expertise-Content] (9) */}
            <div className="relative z-10 space-y-12">
              
              {/* (A) ส่วนหัวเรื่อง (Title + Subtitle) */}
              {/* TAG: [Request 1] */}
              {/* 'block' (แสดงบน Mobile) */}
              {/* 'md:hidden' (ซ่อนบน Tablet) */}
              {/* 'lg:block' (แสดงบน Desktop) */}
              <div className="text-center max-w-3xl mx-auto block md:hidden lg:block">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  {t.expertise.title}
                </h2>
                <p className="text-lg text-slate-600">
                  {t.expertise.subtitle}
                </p>
              </div>
              
              {/* (B) ส่วนการ์ด (Responsive Grid) */}
              {/* (โค้ดส่วนนี้คงเดิม ไม่มีการเปลี่ยนแปลง) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {t.expertise.cards.map((card) => (
                  <div 
                    key={card.title}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl
                               flex flex-col space-y-4
                               hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <card.icon className="h-10 w-10 text-blue-600" />
                    <h3 className="text-2xl font-semibold text-slate-900 pt-2">
                      {card.title}
                    </h3>
                    <span className="block text-blue-600 font-medium">
                      {card.sub}
                    </span>
                    <p className="text-slate-600 flex-1">
                      {card.desc}
                    </p>
                  </div>
                ))}

                <div 
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl
                             flex-col space-y-4
                             hover:shadow-2xl hover:scale-[1.02] transition-all duration-300
                             hidden md:flex lg:hidden"
                >
                  <secretCard.icon className="h-10 w-10 text-blue-600" />
                  <h3 className="text-2xl font-semibold text-slate-900 pt-2">
                    {secretCard.title}
                  </h3>
                  <span className="block text-blue-600 font-medium">
                    {secretCard.sub}
                  </span>
                  <p className="text-slate-600 flex-1">
                    {secretCard.desc}
                  </p>
                </div>

              </div>
            </div>
          </section>
          
          {/* ============================================= */}
          {/* (จบ Section Expertise) */}
          {/* ============================================= */}

          {/* ส่วน "Work" (เหมือนเดิม) */}
          <div id="work" className="mb-32">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Work</h2>
              <p className="text-gray-600 mb-6">
                Hover เมนูใดๆ เพื่อดู effect ที่เมนูอื่นจะจางลง
              </p>
              <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl"></div>
            </div>
          </div>
          
          {/* ส่วน "Experience" (เหมือนเดิม) */}
          <div id="experience" className="mb-32">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience</h2>
              <p className="text-gray-600 mb-6">
                เนื้อหาส่วนที่ 4
              </p>
              <div className="h-40 bg-gradient-to-br from-pink-100 to-red-100 rounded-xl"></div>
            </div>
          </div>

          {/* ส่วน "Contact" (เหมือนเดิม) */}
          <div id="contact" className="mb-32">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-600 mb-6">
                เนื้อหาส่วนสุดท้าย
              </p>
              <div className="h-40 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}