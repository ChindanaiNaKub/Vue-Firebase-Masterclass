# Chapter 2: Vue Component และ Concept

## Component คืออะไร?

ก้อน UI ที่รวม HTML + CSS + JavaScript ไว้ด้วยกัน

**โครงสร้าง 1 Component:**

```vue
<script setup>
// JavaScript Logic
</script>

<template>
  <!-- HTML -->
</template>

<style scoped>
/* CSS */
</style>
```

---

## Root Component

จุดเริ่มต้นของ App คือ `App.vue`

```javascript
// main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

---

## Reactive Variables

### ref() - ตัวแปรพื้นฐาน

```javascript
import { ref } from 'vue'

const count = ref(0)
const name = ref('John')

// เข้าถึงค่าใน script ต้องใช้ .value
count.value++
```

### reactive() - Object/Array

```javascript
import { reactive } from 'vue'

const user = reactive({
  name: 'John',
  age: 25
})

// เข้าถึงค่าตรงๆ ไม่ต้อง .value
user.name = 'Jane'
```

---

## Template Syntax

### แสดงข้อมูล

```vue
<template>
  <p>{{ message }}</p>
</template>
```

### v-bind - ผูก Attribute

```vue
<!-- เต็ม -->
<img v-bind:src="imageUrl">

<!-- ย่อ -->
<img :src="imageUrl">
```

### v-model - Two-way Binding

```vue
<input v-model="username">
<!-- พิมพ์อะไร ตัวแปร username ก็เปลี่ยนตาม -->
```

### v-if / v-else - แสดงตามเงื่อนไข

```vue
<p v-if="isLoggedIn">ยินดีต้อนรับ</p>
<p v-else>กรุณา Login</p>
```

### v-for - วนลูป

```vue
<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>
```

### @click - Event Handler

```vue
<!-- เต็ม -->
<button v-on:click="handleClick">Click</button>

<!-- ย่อ -->
<button @click="handleClick">Click</button>
```

---

## Methods

```vue
<script setup>
const sayHello = () => {
  alert('Hello!')
}

const add = (a, b) => {
  return a + b
}
</script>

<template>
  <button @click="sayHello">Say Hello</button>
</template>
```

---

## สรุป Syntax ที่ใช้บ่อย

| Syntax | หน้าที่ | ตัวอย่าง |
|--------|--------|---------|
| `{{ }}` | แสดงข้อมูล | `{{ name }}` |
| `:attr` | ผูก attribute | `:src="url"` |
| `v-model` | two-way binding | `v-model="text"` |
| `v-if` | แสดงตามเงื่อนไข | `v-if="show"` |
| `v-for` | วนลูป | `v-for="i in list"` |
| `@event` | จับ event | `@click="fn"` |
