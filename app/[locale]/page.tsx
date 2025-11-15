// 📍 ที่อยู่ไฟล์: app/[locale]/page.tsx
'use client'; 

import { useParams } from 'next/navigation';

// TAG: [Import] Import 5 Section ของเรา + Footer
import HeroHeader from "../components/sections/HeroHeader";
import WorkSection from '../components/sections/WorkSection';
import ExperienceSection from '../components/sections/ExperienceSection';
import ContactSection from '../components/sections/ContactSection'; 
import Footer from '../components/layout/Footer'; // <--- Import Footer Component

// (Icons ทั้งหมดคงเดิม)
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
const IconCode = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0-4.5 9" />
  </svg>
);

// --------------------------------------------------------------------------------
// TAG: [Content] English Content
// --------------------------------------------------------------------------------
const enContent = {
  hero: {
    subtitle: "Full-Stack Developer",
    description: "Building solutions that are functional, beautiful, and business-driven.",
    buttons: {
      projects: "View Projects",
      contact: "Contact Me"
    }
  },
  navbar: {
    home: "home",
    expertise: "expertise",
    work: "work",
    experience: "experience",
    contact: "contact"
  },
  expertise: {
    title: "My Expertise",
    subtitle: "My capabilities aren't just limited to code. I combine strategic development with over a decade of design experience to build solutions that are not only functional, but also beautiful and business-driven.",
    cards: [
      { icon: IconReact, title: "Full-Stack Development", sub: "React, Next.js", desc: "Over 5 years of experience in building modern, high-performance web applications. Deep experience with JavaScript, TypeScript, React, Next.js, and integrating backend services like Firebase, Supabase, and PostgreSQL." },
      { icon: IconDesign, title: "Graphic Design & UI/UX", sub: "11+ Years of Experience", desc: "A designer's eye with a developer's mind. Over a decade of professional experience in branding, visual identity, and creating intuitive, beautiful user interfaces (UI/UX)." },
      { icon: IconStrategy, title: "Digital Strategy & Data", sub: "Business-Driven Solutions", desc: "Building software is not just about code; it's about solving real-world business problems. 4+ years of experience in digital marketing, data analysis, and developing solutions that deliver measurable results." }
    ]
  },
  work: {
    title: 'My Work',
    description: "While others build apps, I build experiences. Where they focus on features, I focus on results. As a Creative Technologist with 11+ years in design and 5+ in full-stack engineering, I manage the entire process from pixel to production—ensuring every solution is not only a technical success but a strategic one.",
    filters: {
      all: "All",
      fullStack: "Full-Stack Applications",
      uiUx: "UI/UX & Branding",
      data: "Data-Driven Solutions"
    },
    card: {
      showProject: "Show project",
      categories: {
        fullStack: "Full-Stack Application",
        uiUx: "UI/UX & Branding",
        data: "Data-Driven Solution"
      }
    }
  },
  experience: {
    title: "My Journey", 
    items: [
      {
        title: "Lead Creative Technologist",
        years: "2025 - Present",
        location: "Udon thani, Thailand",
        domain: "udautoglass.com",
        description: "Leading the development of high-impact web applications, bridging the gap between complex engineering and pixel-perfect design.",
        tech: ["Next.js", "Node.js", "Vercel", "PostgreSQL", "Firebase"],
        logoUrl: "images/test_logo_udg.png"
      },
      {
        title: "Senior Full-Stack Developer",
        years: "2024 - Present",
        location: "Udon thani, Thailand",
        domain: "uda.co.th",
        description: "Architected and built scalable SaaS platforms using React and Python (Django). Focused on performance optimization and database management.",
        tech: ["React", "WordPress", "MySQL", "PHP", "JavaScript"],
        logoUrl: "images/test_logo_uda.png"
      },
      {
        title: "UI/UX Designer & Frontend Dev",
        years: "2023 - Present",
        location: "Udon thani, Thailand",
        domain: "zealprotech.com",
        description: "Worked directly with clients to design brand identities, user interfaces (UI/UX), and develop custom websites (WordPress, Webflow).",
        tech: ["Figma", "WordPress", "HTML", "CSS", "JavaScript"],
        logoUrl: "images/logo_tbi.jpg"
      },
      {
        title: "Junior Graphic Designer",
        years: "2019 - 2022",
        location: "Udon thani, Thailand",
        domain: "romaclinic.co",
        description: "Started my career in design, focusing on print media, branding, and marketing materials for local businesses.",
        tech: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"],
        logoUrl: "images/logo-roma.png"
      }
    ]
  },
  contact: {
    name: "Park",
    title: "My focus is on the next challenge.",
    body: "Have a complex problem that needs a creative and strategic solution? Let's start the conversation.",
    connectTitle: "Let's Connect",
    email: "kk.papark@gmail.com",
    phoneDisplay: "080-060-6884", 
    phoneRaw: "+66800606884", 
    socialTitle: "Find me online",
    links: {
      github: "https://github.com/sixday-dev", 
      facebook: "https://www.facebook.com/k.khunon",
      instagram: "https://www.instagram.com/krishkhunon",
      tiktok: "https://www.tiktok.com/@chrisparker6969",
      line: "https://line.me/ti/p/whgj96JBlW",
      whatsapp: "https://wa.me/66800606884"
    }
  }
};

// --------------------------------------------------------------------------------
// TAG: [Content] Thai Content
// --------------------------------------------------------------------------------
const thContent = {
  hero: {
    subtitle: "นักพัฒนา Full-Stack",
    description: "สร้างสรรค์โซลูชันที่ทำงานได้จริง สวยงาม และตอบโจทย์ธุรกิจ",
    buttons: {
      projects: "ชมผลงาน",
      contact: "ติดต่อ"
    }
  },
  navbar: {
    home: "หน้าหลัก",
    expertise: "ตัวตน",
    work: "ผลงาน",
    experience: "เส้นทาง",
    contact: "ติดต่อ"
  },
  expertise: {
    title: "ความเชี่ยวชาญของผม",
    subtitle: "ความสามารถของผมไม่ได้จำกัดอยู่แค่การเขียนโค้ด แต่คือการผสมผสานการพัฒนาเชิงกลยุทธ์เข้ากับประสบการณ์ด้านการออกแบบกว่าทศวรรษ เพื่อสร้างโซลูชันที่ไม่เพียงแค่ทำงานได้ แต่ยังสวยงามและตอบโจทย์ทางธุรกิจอีกด้วย",
    cards: [
      { icon: IconReact, title: "การพัฒนาแบบ Full-Stack", sub: "React, Next.js", desc: "ประสบการณ์มากกว่า 5 ปี ในการสร้างเว็บแอปพลิเคชันสมัยใหม่ประสิทธิภาพสูง มีประสบการณ์ลึกซึ้งกับ JavaScript, TypeScript, React, Next.js และการเชื่อมต่อบริการ Backend อย่าง Firebase, Supabase และ PostgreSQL" },
      { icon: IconDesign, title: "การออกแบบกราฟิก & UI/UX", sub: "ประสบการณ์มากกว่า 11 ปี", desc: "มองปัญหาด้วยสายตาของดีไซเนอร์ แก้ปัญหาด้วยสมองของนักพัฒนา ประสบการณ์กว่าทศวรรษในการสร้างแบรนด์, อัตลักษณ์องค์กร (Branding) และการออกแบบ User Interface (UI/UX) ที่สวยงามและใช้งานง่าย" },
      { icon: IconStrategy, title: "กลยุทธ์ดิจิทัล & ข้อมูล", sub: "โซลูชันที่ขับเคลื่อนด้วยธุรกิจ", desc: "การสร้างซอฟต์แวร์ไม่ใช่แค่การเขียนโค้ด แต่คือการแก้ปัญหาทางธุรกิจในโลกแห่งความเป็นจริง ประสบการณ์มากกว่า 4 ปี ด้านการตลาดดิจิทัล, การวิเคราะห์ข้อมูล และการพัฒนาโซลูชันที่สร้างผลลัพธ์ที่วัดผลได้จริง" }
    ]
  },
  work: {
    title: 'ผลงานของฉัน',
    description: "ในขณะที่คนอื่นสร้าง 'แอป', ผมสร้าง 'ประสบการณ์' ในขณะที่พวกเขาสนใจ 'ฟีเจอร์', ผมสนใจ 'ผลลัพธ์' ในฐานะ Creative Technologist ที่มีประสบการณ์ด้านดีไซน์ 11+ ปี และวิศวกรรม Full-Stack 5+ ปี ผมบริหารจัดการกระบวนการทั้งหมดตั้งแต่เม็ดพิกเซลไปจนถึงการใช้งานจริง เพื่อให้มั่นใจว่าทุกโซลูชันไม่ใช่แค่สำเร็จในเชิงเทคนิค แต่ยังสำเร็จในเชิงกลยุทธ์ด้วย",
    filters: {
      all: "ทั้งหมด",
      fullStack: "เว็บแอปพลิเคชัน",
      uiUx: "ดีไซน์และแบรนด์",
      data: "โซลูชันเชิงข้อมูล"
    },
    card: {
      showProject: "ชมโปรเจกต์",
      categories: {
        fullStack: "เว็บแอปพลิเคชัน",
        uiUx: "ดีไซน์และแบรนด์",
        data: "โซลูชันเชิงข้อมูล"
      }
    }
  },
  experience: {
    title: "เส้นทางของผม", 
    items: [
      {
        title: "หัวหน้าทีม Creative Technologist",
        years: "2025 - ปัจจุบัน",
        location: "อุดรธานี, ประเทศไทย",
        domain: "udautoglass.com",
        description: "นำทีมพัฒนาเว็บแอปพลิเคชันที่มีผลกระทบสูง เชื่อมช่องว่างระหว่างวิศวกรรมที่ซับซ้อนและการออกแบบที่สมบูรณ์แบบทุกพิกเซล",
        tech: ["Next.js", "Node.js", "Vercel", "PostgreSQL", "Firebase"],
        logoUrl: "images/test_logo_udg.png"
      },
      {
        title: "นักพัฒนา Full-Stack อาวุโส",
        years: "2024 - ปัจจุบัน",
        location: "อุดรธานี, ประเทศไทย",
        domain: "uda.co.th",
        description: "ออกแบบสถาปัตยกรรมและสร้างแพลตฟอร์ม SaaS ที่ขยายตัวได้ โดยใช้ React และ Python (Django) เน้นการเพิ่มประสิทธิภาพและการจัดการฐานข้อมูล",
        tech: ["React", "WordPress", "MySQL", "PHP", "JavaScript"],
        logoUrl: "images/test_logo_uda.png"
      },
      {
        title: "นักออกแบบ UI/UX & นักพัฒนา Frontend",
        years: "2023 - ปัจจุบัน",
        location: "อุดรธานี, ประเทศไทย",
        domain: "zealprotech.com",
        description: "ทำงานร่วมกับลูกค้าโดยตรงเพื่อออกแบบอัตลักษณ์แบรนด์, User Interfaces (UI/UX), และพัฒนาเว็บไซต์ (WordPress, Webflow)",
        tech: ["Figma", "WordPress", "HTML", "CSS", "JavaScript"],
        logoUrl: "images/logo_tbi.jpg"
      },
      {
        title: "นักออกแบบกราฟิก (Junior)",
        years: "2019 - 2022",
        location: "อุดรธานี, ประเทศไทย",
        domain: "romaclinic.co",
        description: "เริ่มต้นอาชีพด้านการออกแบบ โดยเน้นที่สื่อสิ่งพิมพ์, การสร้างแบรนด์, และสื่อการตลาดสำหรับธุรกิจในท้องถิ่น",
        tech: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"],
        logoUrl: "images/logo-roma.png"
      }
    ]
  },
  contact: {
    name: "ปาร์ค",
    title: "ผมโฟกัสที่ \"ความท้าทาย\" ครั้งต่อไป",
    body: "มีปัญหาที่ซับซ้อนที่ต้องการโซลูชันที่ \"สร้างสรรค์\" และ \"มีกลยุทธ์\" ไหมครับ? มาเริ่มต้นบทสนทนากัน",
    connectTitle: "ติดต่อ",
    email: "kk.papark@gmail.com",
    phoneDisplay: "080-060-6884", 
    phoneRaw: "+66800606884", 
    socialTitle: "ช่องทางติดตาม",
    links: {
      github: "https://github.com/sixday-dev", 
      facebook: "https://www.facebook.com/k.khunon",
      instagram: "https://www.instagram.com/krishkhunon/",
      tiktok: "https://www.tiktok.com/@chrisparker6969",
      line: "https://line.me/ti/p/whgj96JBlW",
      whatsapp: "https://wa.me/66800606884"
    }
  }
};

// --------------------------------------------------------------------------------

export default function HomePage() {
  const params = useParams();
  const locale = params.locale as string;
  const t = locale === 'th' ? thContent : enContent;
  
  const secretCard = {
    icon: IconCode,
    title: locale === 'th' ? "ความเชี่ยวชาญของผม" : "My Expertise",
    sub: locale === 'th' ? "จุดที่โค้ดบรรจบกับดีไซน์และกลยุทธ์" : "Where Code Meets Design & Strategy",
    desc: t.expertise.subtitle 
  };

  return (
    // TAG: [FIX] ปรับ min-h-screen และโครงสร้าง
    <div className="
      min-h-screen flex flex-col 
      bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 
      dark:from-slate-900 dark:via-slate-950 dark:to-black 
      transition-colors duration-300
    ">
      
      <HeroHeader t={t.hero} />

      {/* TAG: [FIX] ใช้ main tag เพื่อห่อหุ้ม Section ต่างๆ */}
      <main className="flex-grow pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          <section id="expertise" className="relative pb-56 scroll-mt-24 pt-32 md:pt-24 lg:pt-32">
            
            <div 
              className="absolute inset-0 z-0 opacity-20 dark:opacity-10"
              style={{
                backgroundImage: "url('/images/code-bg-light.png')",
                backgroundPosition: 'bottom center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '600px auto'
              }}
            />
            <div className="relative z-10 space-y-12">
              <div className="text-center max-w-3xl mx-auto block md:hidden lg:block">
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                  {t.expertise.title}
                </h2>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  {t.expertise.subtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.expertise.cards.map((card) => (
                  <div 
                    key={card.title}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-xl flex flex-col space-y-4 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                    <card.icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white pt-2">
                      {card.title}
                    </h3>
                    <span className="block text-blue-600 dark:text-blue-400 font-medium">
                      {card.sub}
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 flex-1">
                      {card.desc}
                    </p>
                  </div>
                ))}
                <div 
                  className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-slate-700 shadow-xl flex-col space-y-4 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hidden md:flex lg:hidden"
                >
                  <secretCard.icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white pt-2">
                    {secretCard.title}
                  </h3>
                  <span className="block text-blue-600 dark:text-blue-400 font-medium">
                    {secretCard.sub}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 flex-1">
                    {secretCard.desc}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* TAG: [THE-FIX] ลบ locale={locale} ที่ไม่ได้ใช้ออก */}
          <WorkSection t={t.work} />
          
          {/* TAG: [THE-FIX] ลบ locale={locale} ที่ไม่ได้ใช้ออก */}
          <ExperienceSection t={t.experience} />

          <ContactSection t={t.contact} />

        </div>
      </main> {/* <-- ปิด main tag */}

      {/* TAG: [FIX] เพิ่ม Footer ที่นี่ (ตามที่คุณยืนยันไว้) */}
      <Footer />

    </div>
  );
}
