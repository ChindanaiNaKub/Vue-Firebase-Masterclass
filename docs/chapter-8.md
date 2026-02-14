# Chapter 8: ฝั่ง Admin (Backoffice)

## เป้าหมาย

สร้าง Backoffice สำหรับจัดการ Product, User, Order (ยังไม่ต่อ Firebase)

---

## โครงสร้าง

```
src/
├── layouts/
│   └── AdminLayout.vue     # Sidebar + RouterView
├── stores/admin/
│   ├── product.js          # Product CRUD + localStorage
│   ├── user.js             # User (mock)
│   └── order.js            # Order (mock)
└── views/admin/
    ├── LoginView.vue       # ทางเข้า Admin
    ├── DashboardView.vue   # สรุปสถิติ
    ├── product/
    │   ├── ListView.vue
    │   └── UpdateView.vue  # Create + Edit
    ├── user/
    │   ├── ListView.vue
    │   └── UpdateView.vue
    └── order/
        ├── ListView.vue
        └── DetailView.vue
```

---

## Routes

| Path | หน้า |
|------|------|
| `/admin/login` | Login |
| `/admin/dashboard` | Dashboard |
| `/admin/products` | Product List |
| `/admin/products/create` | เพิ่ม Product |
| `/admin/products/edit/:id` | แก้ไข Product |
| `/admin/users` | User List |
| `/admin/users/:id` | แก้ไข User |
| `/admin/orders` | Order List |
| `/admin/orders/:id` | Order Detail |

---

## Stores

- **admin/product**: list, loadProduct, getProduct, addProduct, updateProduct, removeProduct → localStorage `product-data`
- **admin/user**: list (mock), getUser, updateUser, removeUser
- **admin/order**: list (mock), getOrder(index)

---

## เชื่อมกับหน้าบ้าน

- **user/product.js** โหลดจาก localStorage `product-data` (เดียวกับ admin)
- Admin เพิ่ม/แก้ Product → บันทึกที่ `product-data` → หน้าบ้านโหลดได้
