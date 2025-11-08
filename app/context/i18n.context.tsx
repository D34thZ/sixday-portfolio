'use client'; 

import React, { createContext, useContext, ReactNode, useState } from 'react';

// TAG: [Types] (คงเดิม)
type Messages = Record<string, any>;

// TAG: [Fix-8.0] (1) อัปเกรด Type ของ Context
// เราจะเก็บ "ทั้ง" messages และ "ฟังก์ชันอัปเดต" (setter)
type I18nContextType = {
  messages: Messages | null;
  setMessages: (messages: Messages) => void;
};

// TAG: [Fix-8.0] (2) สร้าง Context ด้วย Type ใหม่
const I18nContext = createContext<I18nContextType | null>(null);

// TAG: [Provider] (3) อัปเกรด Provider
export function TranslationsProvider({
  children,
  messages: initialMessages // (เปลี่ยนชื่อเป็น initialMessages)
}: {
  children: ReactNode;
  messages: Messages;
}) {
  // TAG: [Fix-8.0] (4) ใช้ 'useState'
  // เพื่อให้ 'messages' สามารถ "เปลี่ยนแปลง" ได้บน Client
  // 'initialMessages' จะเป็น `{}` (อ็อบเจกต์ว่าง) ที่ส่งมาจาก layout.tsx
  const [messages, setMessages] = useState(initialMessages);

  // TAG: [Fix-8.0] (5) ส่ง 'messages' (state) และ 'setMessages' (setter) ลงไป
  return (
    <I18nContext.Provider value={{ messages, setMessages }}>
      {children}
    </I18nContext.Provider>
  );
}

// TAG: [Hook] (6) อัปเกรด Hook
export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within a TranslationsProvider");
  }

  const { messages, setMessages } = context; // (ดึง messages และ setter)

  // TAG: [Hook] (7) อัปเกรด 't' function
  const t = (key: string): string => {
    // TAG: [Fix-8.0] (8) เพิ่ม Safety Check
    // ถ้า 'messages' ยังเป็น 'null' หรือ '{}' (ยังโหลดไม่เสร็จ)
    // ให้คืนค่า 'key' กลับไปก่อน (ป้องกันแอป Crash)
    if (!messages || Object.keys(messages).length === 0) {
      return key; 
    }

    const keys = key.split('.');
    let result = messages;
    
    for (const k of keys) {
      result = result[k];
      if (!result) {
        console.warn(`Translation key "${key}" not found.`);
        return key; 
      }
    }
    
    return result;
  };

  // TAG: [Fix-8.0] (9) ส่ง 't' และ 'setMessages' กลับไป
  // (เพื่อให้ 'page.tsx' เรียกใช้ 'setMessages' ได้)
  return { t, setMessages };
}