# Chapter 6: Tailwind CSS และ DaisyUI

## Tailwind CSS คืออะไร?

**Utility-first CSS framework** - เขียน style ผ่าน class แทน CSS

### CSS ปกติ vs Tailwind

```css
/* CSS ปกติ */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #3b82f6;
  border-radius: 0.5rem;
}
```

```html
<!-- Tailwind -->
<div class="flex justify-center items-center p-4 bg-blue-500 rounded-lg">
</div>
```

---

## ข้อดีของ Tailwind

| ข้อดี | รายละเอียด |
|-------|-----------|
| **Rapid Prototyping** | ขึ้น design ไวมาก |
| **Consistency** | กำหนด config สีและขนาดได้ |
| **Reduced CSS** | ลด CSS ที่ต้องเขียน |
| **Responsive** | มี breakpoints พร้อมใช้ |

---

## ติดตั้ง Tailwind CSS

```bash
# 1. ติดตั้ง dependencies
npm install -D tailwindcss postcss autoprefixer

# 2. สร้างไฟล์ config
npx tailwindcss init -p
```

### 3. แก้ไข `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. สร้างไฟล์ `src/style.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Import ใน `main.js`

```javascript
import './style.css'
```

---

## DaisyUI คืออะไร?

**Component library** สำหรับ Tailwind - มี components สำเร็จรูป

### ติดตั้ง DaisyUI

```bash
npm install -D daisyui@latest
```

### เพิ่มใน `tailwind.config.js`

```javascript
export default {
  // ...
  plugins: [require("daisyui")],
}
```

---

## Tailwind Cheatsheet

### Layout

| Class | CSS |
|-------|-----|
| `flex` | display: flex |
| `grid` | display: grid |
| `hidden` | display: none |
| `block` | display: block |

### Flexbox

| Class | CSS |
|-------|-----|
| `justify-center` | justify-content: center |
| `justify-between` | justify-content: space-between |
| `items-center` | align-items: center |
| `flex-col` | flex-direction: column |
| `gap-4` | gap: 1rem |

### Spacing (Padding/Margin)

| Class | CSS |
|-------|-----|
| `p-4` | padding: 1rem |
| `px-4` | padding-left/right: 1rem |
| `py-2` | padding-top/bottom: 0.5rem |
| `m-4` | margin: 1rem |
| `mt-4` | margin-top: 1rem |

### Sizing

| Class | CSS |
|-------|-----|
| `w-full` | width: 100% |
| `w-1/2` | width: 50% |
| `h-screen` | height: 100vh |
| `max-w-md` | max-width: 28rem |

### Colors

| Class | ตัวอย่าง |
|-------|---------|
| `bg-blue-500` | background สีน้ำเงิน |
| `text-white` | ตัวหนังสือสีขาว |
| `border-gray-300` | เส้นขอบสีเทา |

### Border & Rounded

| Class | CSS |
|-------|-----|
| `rounded` | border-radius: 0.25rem |
| `rounded-lg` | border-radius: 0.5rem |
| `rounded-full` | border-radius: 9999px |
| `border` | border-width: 1px |

### Typography

| Class | CSS |
|-------|-----|
| `text-sm` | font-size: 0.875rem |
| `text-lg` | font-size: 1.125rem |
| `text-xl` | font-size: 1.25rem |
| `font-bold` | font-weight: 700 |
| `text-center` | text-align: center |

---

## Responsive Design

ใช้ prefix: `sm:`, `md:`, `lg:`, `xl:`

```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 
    mobile: เต็มจอ
    tablet (md): ครึ่งจอ  
    desktop (lg): 1/3 จอ
  -->
</div>
```

| Prefix | Breakpoint |
|--------|------------|
| `sm:` | ≥640px |
| `md:` | ≥768px |
| `lg:` | ≥1024px |
| `xl:` | ≥1280px |

---

## DaisyUI Components

### Button

```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-error">Error</button>
```

### Input

```html
<input type="text" class="input input-bordered w-full" placeholder="Type here">
```

### Checkbox

```html
<input type="checkbox" class="checkbox checkbox-primary">
```

### Badge

```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
```

### Card

```html
<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Title</h2>
    <p>Content</p>
  </div>
</div>
```

### Loading

```html
<span class="loading loading-spinner loading-lg"></span>
```

### Toast

```html
<div class="toast">
  <div class="alert alert-success">
    <span>บันทึกสำเร็จ!</span>
  </div>
</div>
```

### Tabs

```html
<div class="tabs tabs-boxed">
  <a class="tab">Tab 1</a>
  <a class="tab tab-active">Tab 2</a>
  <a class="tab">Tab 3</a>
</div>
```

---

## สรุป

| เครื่องมือ | หน้าที่ |
|-----------|--------|
| **Tailwind** | Utility classes แทน CSS |
| **DaisyUI** | Components สำเร็จรูป |
| **Responsive** | ใช้ prefix sm:/md:/lg: |
