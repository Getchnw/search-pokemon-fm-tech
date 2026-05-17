# ⚡ Pokémon Search & Discovery App (Next.js + GraphQL)

เว็บแอปพลิเคชันค้นหาและแสดงผลข้อมูลโปเกมอนเชิงลึก (Gen 1) พัฒนาขึ้นด้วยสถาปัตยกรรมที่ทันสมัยโดยใช้ **Next.js 15 (App Router)** ร่วมกับ **Apollo Client (GraphQL)** และตกแต่งส่วนติดต่อผู้ใช้ด้วย **shadcn/ui** และ **Tailwind CSS v4** เพื่อความรวดเร็ว สวยงาม และรองรับการแสดงผลทุกอุปกรณ์ (Responsive Design)

---

## ✨ คุณสมบัติของระบบ (Core Features)

- **📡 GraphQL Integration:** ดึงข้อมูลแบบเรียลไทม์จากระบบเซิร์ฟเวอร์ด้วย Apollo Client พร้อมจัดการระบบ Cache ข้อมูลฝั่ง Client (`cache-first`) อย่างมีประสิทธิภาพ
- **🔍 Advanced Search System:** ระบบค้นหาที่ผูกสเตตัสทำงานสัมพันธ์ร่วมกับ URL Parameters พร้อมใช้กลไก **Debounced Input (หน่วงเวลาพิมพ์ 300ms)** เพื่อลดปริมาณการเรนเดอร์ซ้ำซ้อนและลดภาระหลังบ้าน และระบบจะล็อกกลับไปหน้าแรก (`page=1`) โดยอัตโนมัติป้องกันบั๊กหน้าว่าง
- **🎛️ Dynamic Type Filter:** เลือกกรองประเภทธาตุโปเกมอนผ่าน **Shadcn Dropdown Menu** โดยปุ่มจะเปลี่ยนสถานะสีแบบไดนามิกเมื่อตรวจพบฟิลเตอร์ และจะถูกรีเซ็ตล้างค่าอัตโนมัติเมื่อกดเลือกเป็น "All Types"
- **🔢 URL-Driven Pagination:** ระบบแบ่งหน้าการแสดงผลโดยขับเคลื่อนผ่านพารามิเตอร์คิวรีบน URL อย่างสมบูรณ์ ทำให้ผู้ใช้สามารถคัดลอกลิงก์ผลการค้นหาหน้าปัจจุบันไปแชร์ต่อได้ทันที (Shareable State)
- **⚡ Skeleton Loading & Shimmer Effect:** เพิ่มประสบการณ์การใช้งานที่ไร้รอยต่อ (UX) ด้วยโครงร่างกล่องจำลองระหว่างดึงข้อมูล ป้องกันปัญหาหน้าจอกระตุกหรือวูบวาบ (Zero Layout Shift)
- **🛡️ Comprehensive TypeScript Typing:** ควบคุมและล็อกชนิดข้อมูลด้วย TypeScript Interfaces อย่างเข้มงวด ตั้งแต่โครงสร้างอ็อบเจกต์ของคิวรี ไปจนถึง Props ของคอมโพเนนต์ย่อย

---

## 📂 โครงสร้างโฟลเดอร์ของโปรเจกต์ (Project Structure)

```text
src/
├── app/                              # Next.js App Router (Routing เลเยอร์)
│   ├── favicon.ico
│   ├── globals.css                   # Tailwind CSS v4 Global Configuration
│   ├── layout.tsx                    # โครงสร้างหลักที่ครอบแอปพร้อม Apollo & Sonner Provider
│   └── page.tsx                      # หน้าแสดงรายการโปเกมอนทั้งหมด (Home Page)
│   └── pokemon/
│       └── [name]/
│           └── page.tsx              # หน้าแสดงข้อมูลเชิงลึกรายตัว (Detail Page)
├── components/
│   ├── layout/                       # โครงสร้างส่วนหัวและส่วนท้ายหน้าเว็บ
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── loading/                      # สเกลเลตอนสำหรับสถานะ Loading
│   │   ├── SkeletonGrid.tsx          # โครงสร้างหลอกสำหรับหน้าแรก
│   │   └── PokemonDetailSkeleton.tsx # โครงสร้างหลอกสำหรับหน้ารายละเอียด
│   ├── main/                         # คอมโพเนนต์เฉพาะสำหรับหน้าแรก
│   │   ├── MainPage.tsx              # ตัวควบคุมตรรกะ ตัวกรอง และ Pagination
│   │   ├── PokemonGrid.tsx
│   │   ├── PokemonCard.tsx
│   │   └── Pagination.tsx
│   └── shared/                       # คอมโพเนนต์ส่วนกลางที่ใช้ซ้ำได้ทั่วทั้งแอป
│       ├── SearchBar.tsx             # ช่องเสิร์ชโปเกมอน (Debounce)
│       ├── FilterButton.tsx          # ปุ่มดรอปดาวน์เลือกธาตุ
│       ├── PokemonTypeBadge.tsx      # แท็กป้ายสีกำกับธาตุ (Color Mapping)
│       └── PokemonDetailView.tsx     # คอมโพเนนต์วาดโครงสร้างหน้ารายละเอียดเชิงลึก
├── lib/                              # คลาสและโมดูลช่วยเหลือหลังบ้าน
│   ├── apollo-client.ts              # ฟังก์ชันตั้งค่าจุดเชื่อมต่อ GraphQL API Endpoints
│   ├── graphql-queries.ts            # ชุดคำสั่งคิวรีข้อมูล (GET_POKEMONS, GET_POKEMON_DETAILS)
│   └── utils.ts                      # ฟังก์ชันตัวช่วยผสาน Tailwind Class (cn)
├── type/                             # แฟ้มศูนย์รวมสัญญาข้อมูล (TypeScript Interfaces)
│   └── pokemonDataType.ts            # แม่พิมพ์ควบคุมชนิดข้อมูลโปเกมอนทั้งหมด
```
