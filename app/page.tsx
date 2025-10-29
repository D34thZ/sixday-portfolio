// นี่คือไฟล์ app/page.tsx (โค้ดเริ่มต้นใหม่ของเรา)

export default function HomePage() {
  return (
    <main>
      {/* นี่คือพื้นที่ทำงานของเราสำหรับหน้า </home> 
        เดี๋ยวเราจะสร้าง Hero Section, Expertise, Work ฯลฯ ที่นี่
      */}

      <section style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', // สูงเต็มจอ
        fontFamily: 'Kanit, sans-serif' // ใช้ฟอนต์ Kanit ที่เราวางแผนไว้
      }}>
        <h1>ยินดีต้อนรับสู่ SixDay.dev Prototype</h1>
      </section>

    </main>
  );
}