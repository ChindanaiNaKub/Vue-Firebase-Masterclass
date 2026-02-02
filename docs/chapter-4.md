# Chapter 4: Vue Router และ Pinia

## ทำไมต้องใช้ Router และ Pinia?

เมื่อ project ใหญ่ขึ้น:
- **Router** = จัดการหลายหน้า (path)
- **Pinia** = แชร์ state ระหว่าง components/pages

---

## 1. Vue Router

จัดการ path กับ Component

### Setup Router

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    }
  ]
})

export default router
```

### ใช้ใน main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

### App.vue

```vue
<template>
  <!-- แสดง Component ตาม path -->
  <RouterView />
</template>
```

### การ Navigate

```vue
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate ด้วย JavaScript
const goToProfile = () => {
  router.push('/profile')
  // หรือใช้ name
  router.push({ name: 'profile' })
}
</script>

<template>
  <!-- Navigate ด้วย Link -->
  <RouterLink to="/">Home</RouterLink>
  <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
  
  <!-- Navigate ด้วย Button -->
  <button @click="goToProfile">Go to Profile</button>
</template>
```

### Route Params

```javascript
// router/index.js
{
  path: '/book/:id',
  name: 'book-detail',
  component: BookDetailView
}
```

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const bookId = route.params.id
</script>
```

---

## 2. Pinia (State Management)

แชร์ state ระหว่าง components

### สร้าง Store

```javascript
// stores/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const firstname = ref('')
  const lastname = ref('')

  // Actions (methods)
  const updateProfile = (first, last) => {
    firstname.value = first
    lastname.value = last
  }

  const clearProfile = () => {
    firstname.value = ''
    lastname.value = ''
  }

  return {
    firstname,
    lastname,
    updateProfile,
    clearProfile
  }
})
```

### ใช้ใน main.js

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
```

### เรียกใช้ Store

```vue
<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// อ่านค่า
console.log(userStore.firstname)

// เรียก action
userStore.updateProfile('John', 'Doe')
</script>

<template>
  <p>{{ userStore.firstname }} {{ userStore.lastname }}</p>
</template>
```

---

## โครงสร้าง Project

```
src/
├── components/       # Common Components (reuse ได้)
├── views/           # Page Components (แต่ละหน้า)
├── router/
│   └── index.js     # กำหนด routes
├── stores/          # Pinia stores
│   └── user.js
├── App.vue
└── main.js
```

---

## สรุป

| ตัว | หน้าที่ | ใช้เมื่อ |
|-----|--------|---------|
| **Router** | จัดการ path/หน้า | มีหลายหน้าในเว็บ |
| **Pinia** | แชร์ state กลาง | ส่งข้อมูลข้าม components/pages |

### Router Cheatsheet

```javascript
// Navigate
router.push('/path')
router.push({ name: 'routeName' })
router.push({ name: 'routeName', params: { id: 1 } })

// Get current route
const route = useRoute()
route.params.id
route.name
route.path
```

### Pinia Cheatsheet

```javascript
// สร้าง store
export const useMyStore = defineStore('storeName', () => {
  const data = ref([])           // state
  const addItem = (item) => {}   // action
  return { data, addItem }
})

// ใช้ store
const store = useMyStore()
store.data           // อ่าน state
store.addItem(x)     // เรียก action
```
