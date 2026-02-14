# Chapter 7: Easy E-commerce (ฝั่ง User)

## เป้าหมาย

สร้างหน้าเว็บ E-commerce ฝั่ง User พร้อม Layout, Product, Cart, Checkout (ยังไม่ต่อ Firebase)

---

## โครงสร้างโปรเจค

```
src/
├── layouts/
│   └── UserLayout.vue    # Navbar + Footer + slot
├── stores/
│   ├── event.js          # Toast / popup message
│   └── user/
│       ├── product.js    # รายการสินค้า
│       └── cart.js       # ตะกร้าสินค้า + checkout
├── views/user/
│   ├── HomeView.vue      # หน้าหลัก
│   ├── SearchView.vue    # ค้นหาสินค้า
│   ├── ProfileView.vue  # แก้ไข Profile
│   ├── CartView.vue      # ตะกร้าสินค้า
│   ├── CheckoutView.vue  # ชำระเงิน
│   └── SuccessView.vue   # ชำระเงินสำเร็จ
└── components/
    ├── ProductList.vue   # แสดงรายการสินค้า (ใช้ใน Home + Search)
    └── Toast.vue         # แจ้งเตือน
```

---

## 1. Layout (Slot)

**UserLayout.vue** ใช้ `<slot />` ให้ child view แทรกตรงกลาง

```vue
<template>
  <div>
    <nav>...</nav>
    <main><slot /></main>
    <footer>...</footer>
  </div>
</template>
```

- Navbar: Logo, Search box, ตะกร้า (badge จำนวน), Login/Profile dropdown
- Login state เก็บใน `localStorage`
- ตะกร้า: กดแล้วแสดง popup ยอดรวม + ปุ่มไปหน้าตะกร้า

---

## 2. Stores

### event.js
- `alert`, `data` (state)
- `popupMessage(status, message)` แสดง Toast 3 วินาที
- `clearPopup()`

### user/product.js
- `list` รายการสินค้า, `loaded`
- `loadProduct()` โหลดข้อมูล
- `filterProducts(searchName)` คืนค่า list ที่ filter ตามชื่อ

### user/cart.js
- `items` รายการในตะกร้า, `checkout` ข้อมูลหลัง checkout
- getters: `quantity`, `summaryPrice`
- actions: `loadCart()`, `addToCart(product)`, `updateQuantity(i, qty)`, `removeItemInCart(i)`, `checkout(data)`, `loadCheckout()`
- sync กับ `localStorage` (cart-item, checkout-data)

---

## 3. หน้าแต่ละหน้า

| หน้า | path | หน้าที่ |
|------|------|--------|
| Home | `/` | แสดง ProductList, ปุ่ม Buy Now → addToCart + ไป cart |
| Search | `/search?q=` | รับ q จาก query, filterProducts, ProductList เหมือน Home |
| Profile | `/profile` | Form name, email, profileImage, บันทึก localStorage + Toast |
| Cart | `/cart` | แสดง items, ปรับจำนวน, ลบ, สรุปยอด, ปุ่มไป Checkout |
| Checkout | `/checkout` | Form ที่อยู่จัดส่ง, สรุปตะกร้า, กดชำระ → checkout() → Success |
| Success | `/success` | แสดง order number, สรุปสินค้า, ยอดรวม |

---

## 4. Router (Nested)

```javascript
{
  path: '/',
  component: UserLayout,
  children: [
    { path: '', name: 'home', component: HomeView },
    { path: 'search', name: 'search', component: SearchView },
    { path: 'profile', name: 'profile', component: ProfileView },
    { path: 'cart', name: 'cart', component: CartView },
    { path: 'checkout', name: 'checkout', component: CheckoutView },
    { path: 'success', name: 'success', component: SuccessView },
  ]
}
```

---

## สรุป

- ใช้ **Slot** ใน UserLayout
- ใช้ **Pinia** (product, cart, event) + **localStorage**
- ใช้ **Router** nested + query (`/search?q=...`)
- ใช้ **Toast** ผ่าน event store
