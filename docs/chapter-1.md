# Chapter 1: แนะนำ Vue และ Firebase

## Vue.js คืออะไร?

JavaScript Framework สำหรับสร้าง UI ฝั่ง Frontend

**คุณสมบัติหลัก:**
- Component-based = แบ่ง UI เป็นชิ้นเล็กๆ reuse ได้
- Declarative = จัดการตัวแปรอัตโนมัติ

---

## Firebase คืออะไร?

Platform จาก Google รวมเครื่องมือพัฒนา Web/App

**Services ที่ใช้ใน Course:**

| Service | หน้าที่ |
|---------|--------|
| Firestore | NoSQL Database แบบ Realtime |
| Authentication | ระบบ Login |
| Storage | เก็บไฟล์/รูปภาพ |
| Hosting | Deploy เว็บ |
| Cloud Functions | Backend API |

---

## เป้าหมาย Course

สร้าง **Easy E-commerce** มี 2 ส่วน:

### 1. หน้าเว็บ E-commerce
- แสดงสินค้า + ค้นหา
- ตะกร้าสินค้า
- Checkout + Payment

### 2. หน้า Backoffice (Admin)
- จัดการ Product
- จัดการ User
- จัดการ Order

---

## Setup โปรเจค

```bash
# สร้างโปรเจค Vue ด้วย Vite
npm create vite@latest my-project -- --template vue

# เข้าโฟลเดอร์
cd my-project

# ติดตั้ง dependencies
npm install

# รัน dev server
npm run dev
```

---

## โครงสร้างโปรเจค

```
my-project/
├── index.html        # HTML หลัก
├── src/
│   ├── main.js       # จุดเริ่มต้น JavaScript
│   ├── App.vue       # Root Component
│   └── components/   # เก็บ Components
└── package.json      # Dependencies
```
