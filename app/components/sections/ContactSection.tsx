"use client";

// TAG: [Component] ContactSection
// นี่คือ Component สุดท้ายสำหรับส่วน "Contact"
// เราใช้ "use client" สำหรับ Framer Motion

import { motion } from "framer-motion";
// TAG: [FIX] Import ไอคอนมาตรฐานจาก Lucide (ลบ Github ออก)
import { Mail, Phone, ArrowUpRight } from "lucide-react";

// TAG: [FIX] (ตามคำขอ) Import ไอคอนแบรนด์จาก 'react-icons'
import { 
  FaGithub, 
  FaFacebook, 
  FaInstagram, 
  FaTiktok, 
  FaWhatsapp 
} from "react-icons/fa"; // ดึงจาก Font Awesome
import { SiLine } from "react-icons/si"; // LINE อยู่ใน 'si' (Simple Icons)

// --------------------------------------------------------------------------------
// TAG: [FIX] เราลบ 'const FacebookIcon = ...' ทั้งหมดทิ้ง
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// TAG: Animation Variants (คงเดิม)
// --------------------------------------------------------------------------------
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const iconHover = {
  scale: 1.2,
  rotate: -5,
  transition: { type: "spring", stiffness: 300 },
};

// --------------------------------------------------------------------------------
// TAG: ContactSection Component
// --------------------------------------------------------------------------------

interface ContactSectionProps {
  t: any; // รับ t (translation object) ทั้งก้อน (t.contact)
}

const ContactSection: React.FC<ContactSectionProps> = ({ t }) => {
  // TAG: [FIX] เปลี่ยน 'icon' ให้ชี้ไปที่ Component ที่ Import มาจาก 'react-icons'
  const socials = [
    { name: "GitHub", icon: FaGithub, link: t.links.github },
    { name: "Facebook", icon: FaFacebook, link: t.links.facebook },
    { name: "Instagram", icon: FaInstagram, link: t.links.instagram },
    { name: "TikTok", icon: FaTiktok, link: t.links.tiktok },
    { name: "LINE", icon: SiLine, link: t.links.line },
    { name: "WhatsApp", icon: FaWhatsapp, link: t.links.whatsapp },
  ];

  return (
    // TAG: Section Wrapper
    <motion.section
      id="contact"
      className="mb-32 scroll-mt-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible" // Animation จะทำงานเมื่อ Scroll มาถึง
      viewport={{ once: true, amount: 0.3 }} // ทำงานครั้งเดียว
    >
      {/* นี่คือ Card หลัก (สไตล์ Apple) */}
      <motion.div 
        className="
          bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm 
          rounded-3xl border border-gray-200 dark:border-slate-700 
          shadow-xl overflow-hidden
        "
        variants={itemVariants}
      >
        {/* นี่คือ Grid Layout (2 คอลัมน์) */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* ----------------------------------- */}
          {/* TAG: Column 1 (Visual/Identity)     */}
          {/* ----------------------------------- */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center md:items-start text-center md:text-left">
            {/* TAG: [Placeholder] รูปภาพโปรไฟล์ (250x250) */}
            <motion.img
              // TAG: [FIX] แก้ไข Typo ที่ผมทำพลาดครั้งก่อน
              src="images/profile_chris.png" 
              alt="Chris Profile Picture"
              className="rounded-full w-[180px] h-[180px] md:w-[250px] md:h-[250px] object-cover shadow-2xl mb-6"
              variants={itemVariants}
            />
            {/* TAG: [Placeholder] ชื่อ */}
            <motion.h3 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              {t.name}
            </motion.h3>
            
            {/* TAG: [Placeholder] Title (EN/TH) */}
            <motion.p variants={itemVariants} className="text-lg lg:text-xl font-semibold text-blue-600 dark:text-blue-400 mt-4">
              {t.title}
            </motion.p>

            {/* TAG: [Placeholder] Body (EN/TH) */}
            <motion.p variants={itemVariants} className="text-base lg:text-lg text-slate-600 dark:text-slate-300 mt-3 max-w-md">
              {t.body}
            </motion.p>
          </div>

          {/* ----------------------------------- */}
          {/* TAG: Column 2 (Action/Links)        */}
          {/* ----------------------------------- */}
          <div className="p-8 md:p-12 lg:p-16 bg-gray-50 dark:bg-slate-900/50 border-t md:border-t-0 md:border-l border-gray-200 dark:border-slate-700">
            
            <motion.h3 variants={itemVariants} className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              {t.connectTitle}
            </motion.h3>

            {/* --- Links (Email & Phone) --- */}
            <motion.div className="space-y-6" variants={itemVariants}>
              {/* TAG: Email Link */}
              <a 
                href={`mailto:${t.email}`}
                className="
                  flex items-center gap-4 group p-4 rounded-xl 
                  hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors
                "
              >
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Email</span>
                  {/* TAG: [Placeholder] Email */}
                  <p className="text-base font-semibold text-slate-800 dark:text-white group-hover:underline">
                    {t.email}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-400 dark:text-slate-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              
              {/* TAG: Phone Link */}
              <a 
                href={`tel:${t.phoneRaw}`}
                className="
                  flex items-center gap-4 group p-4 rounded-xl 
                  hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors
                "
              >
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Phone</span>
                  {/* TAG: [Placeholder] Phone */}
                  <p className="text-base font-semibold text-slate-800 dark:text-white group-hover:underline">
                    {t.phoneDisplay}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-400 dark:text-slate-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </motion.div>

            {/* --- Divider --- */}
            <motion.hr variants={itemVariants} className="my-8 border-slate-200 dark:border-slate-700" />

            {/* --- Socials --- */}
            <motion.h3 variants={itemVariants} className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              {t.socialTitle}
            </motion.h3> 
            {/* TAG: [FIX] แก้ไขจาก </D> เป็น </motion.h3> */}

            <motion.div 
              className="flex flex-wrap gap-5"
              variants={itemVariants}
            >
              {socials.map((social) => (
                // TAG: [Placeholder] Social Links
                <motion.a
                  key={social.name}
                  href={social.link} // <-- นี่คือ link (ปัจจุบันเป็น '#')
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${social.name}`}
                  variants={itemVariants}
                  whileHover={iconHover} // Animation ตอน Hover
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {/* นี่คือจุดที่ 'icon' (ที่เป็น Component) ถูกเรนเดอร์ */}
                  <social.icon className="h-7 w-7" />
                </motion.a>
              ))}
            </motion.div>

          </div>

        </div>
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;