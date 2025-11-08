// 📍 ที่อยู่ไฟล์: app/[locale]/page.tsx
// นี่คือหน้า Home (/) ของเรา

export default function HomePage() {
  
  // เราจะ "จำลอง" เนื้อหามาจากตัวอย่าง "Code White" 
  // และรูป 174702 ที่คุณต้องการ
  
  return (
    // TAG: [Goal-174702] (1)
    // พื้นหลัง Gradient (จาก Code White)
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
      
      {/* * หมายเหตุ: Navbar (NewNavbar) จะถูกแสดง "อัตโนมัติ" 
        * เพราะมันอยู่ใน 'app/[locale]/layout.tsx' (ไฟล์แม่)
        * เราจึงไม่ต้อง Import Navbar มาใส่ในหน้านี้
      */}

      {/* TAG: [Goal-174702] (2) Demo Content */}
      {/* เราเพิ่ม pt-32 (padding-top) เพื่อ "เว้นที่" ให้ Navbar ที่ลอยอยู่ */}
      <div className="pt-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* ส่วน "Software Engineer" */}
          <div className="text-center space-y-6 mb-20" id="home">
            <h1 className="text-7xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Software Engineer
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-mono">
              Building modern web applications with passion
            </p>
          </div>

          {/* ส่วน "Expertise" (การ์ด) */}
          <div id="expertise" className="mb-32">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Expertise</h2>
              <p className="text-gray-600 mb-6">
                Scroll down เพื่อดู navbar เปลี่ยนจากโปร่งใสเป็นมีพื้นหลังสีเข้ม
              </p>
              <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl"></div>
            </div>
          </div>

          {/* * เราจะเพิ่มเนื้อหาส่วนที่เหลือ (Work, Experience, Contact) 
            * เพื่อให้ Scroll ได้ยาวๆ และทดสอบ Navbar ได้จริง
          */}

          {/* ส่วน "Work" */}
          <div id="work" className="mb-32">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Work</h2>
              <p className="text-gray-600 mb-6">
                Hover เมนูใดๆ เพื่อดู effect ที่เมนูอื่นจะจางลง
              </p>
              <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl"></div>
            </div>
          </div>
          
          {/* ส่วน "Experience" */}
          <div id="experience" className="mb-32">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-gray-200 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience</h2>
              <p className="text-gray-600 mb-6">
                เนื้อหาส่วนที่ 4
              </p>
              <div className="h-40 bg-gradient-to-br from-pink-100 to-red-100 rounded-xl"></div>
            </div>
          </div>

          {/* ส่วน "Contact" */}
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