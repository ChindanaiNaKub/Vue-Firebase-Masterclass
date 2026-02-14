# Nuxt vs Vue – ทำไมถึงใช้ Nuxt ทั้งที่มี Vue แล้ว?

อ้างอิง: [บทความ Mikelopster](https://mikelopster.dev/posts/nuxt-vs-vue) · [คลิป YouTube](https://www.youtube.com/watch?v=FSomc5aOgKE)

---

## Nuxt คืออะไร?

**Nuxt** = เฟรมเวิร์ก full stack ที่สร้างบน **Vue.js**

- เตรียมสิ่งจำเป็นสำหรับสร้างเว็บด้วย Vue ไว้ให้
- เน้น **Server-Side Rendering (SSR)** เป็นค่าเริ่มต้น
- ครอบคลุม use case สำหรับ production

เว็บ: [nuxt.com](https://nuxt.com/)

---

## ต่างจาก Vue ยังไง?

| เรื่อง | Vue (แบบที่เราใช้ใน Course) | Nuxt |
|--------|------------------------------|------|
| **เริ่มต้น** | สร้าง project เอง (Vite) + ติดตั้ง Router, Pinia | `npx nuxi init` ได้โครงพร้อมใช้ |
| **Routing** | กำหนด routes เองใน `router/index.js` | **Auto Route** จากโครงโฟลเดอร์ `pages/` |
| **SSR** | ทำเอง (ต้องตั้งค่า) | **SSR เป็น default** หรือใช้ Hybrid ต่อหน้าได้ |
| **Config** | แก้ vite.config, ลง plugin เอง | ใช้ไฟล์ config ของ Nuxt (เช่น `nuxt.config`) |

สรุป: Vue = เลือกติดตั้ง/ตั้งค่าทุกอย่างเอง | Nuxt = โครง + routing + SSR พร้อมใช้

---

## สิ่งที่ Nuxt เพิ่มจาก Vue

1. **Server-Side Rendering (SSR)**  
   - render ฝั่ง server ได้  
   - มี [Rendering modes](https://nuxt.com/docs/guide/concepts/rendering) (SSR, Static, Hybrid ต่อหน้า)

2. **SEO และ Meta**  
   - ใช้ SSR กำหนด meta tag, Open Graph สำหรับแชร์โซเชียลได้ง่าย

3. **Auto import**  
   - ไม่ต้อง `import` component / composables / Vue APIs เองในหลายจุด (Nuxt จัดให้ตาม convention)

4. **Convention over configuration**  
   - โฟลเดอร์ `pages/`, `components/`, `layouts/` ฯลฯ ทำงานตาม convention ของ Nuxt

---

## เมื่อไหร่ใช้ Vue เมื่อไหร่ใช้ Nuxt?

| ใช้ **Vue** (แบบ Course นี้) | ใช้ **Nuxt** |
|------------------------------|--------------|
| SPA ธรรมดา, เน้นฝั่งลูกค้า | ต้องการ SEO, meta ดี (landing, blog, e-commerce หน้า public) |
| ควบคุม routing / โครง project เอง | อยากได้ auto route + โครงมาตรฐาน |
| ไม่จำเป็นต้องมี SSR | อยากได้ SSR หรือ Static Site (เช่น deploy บน Vercel) |
| เรียน/ทำโปรเจกต์เล็ก–กลาง | โปรเจกต์ใหญ่หรือ full stack ที่ Nuxt จัดเครื่องมือให้ |

---

## สรุปสั้นๆ

- **Vue** = core + เราต้องต่อ Router, state, build เอง (เหมือนที่ทำใน Vue Firebase Masterclass)
- **Nuxt** = Vue + routing อัตโนมัติ + SSR/Static + SEO + auto import เหมาะกับ production และ full stack

ถ้าอยากลงลึกเรื่อง rendering: [Nuxt – Rendering](https://nuxt.com/docs/guide/concepts/rendering)
