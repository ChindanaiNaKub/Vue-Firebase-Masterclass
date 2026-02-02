# Chapter 5: ต่อ API กับ Vue (Todo List)

## เป้าหมาย

- ต่อ Vue กับ REST API
- ใช้ MockAPI จำลอง Backend
- CRUD operations (Create, Read, Update, Delete)

---

## 1. MockAPI คืออะไร?

เครื่องมือจำลอง REST API ฟรี

**URL:** https://mockapi.io/

### สร้าง Project:
1. สมัคร account
2. สร้าง project ใหม่
3. สร้าง Resource ชื่อ `todos`
4. ได้ API endpoint: `https://xxx.mockapi.io/api/v1/todos`

### API ที่ได้:

| Method | Endpoint | หน้าที่ |
|--------|----------|--------|
| GET | `/todos` | ดึงทั้งหมด |
| GET | `/todos/:id` | ดึงตาม id |
| POST | `/todos` | สร้างใหม่ |
| PUT | `/todos/:id` | อัพเดท |
| DELETE | `/todos/:id` | ลบ |

---

## 2. Fetch API

JavaScript ใช้ `fetch()` ยิง HTTP request

### GET - ดึงข้อมูล

```javascript
const response = await fetch('https://api.example.com/todos')
const data = await response.json()
```

### POST - สร้างข้อมูล

```javascript
const response = await fetch('https://api.example.com/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'New Todo',
    status: false
  })
})
const newTodo = await response.json()
```

### PUT - อัพเดทข้อมูล

```javascript
const response = await fetch(`https://api.example.com/todos/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Updated Todo',
    status: true
  })
})
```

### DELETE - ลบข้อมูล

```javascript
await fetch(`https://api.example.com/todos/${id}`, {
  method: 'DELETE'
})
```

---

## 3. Pinia Store + API

รวม API calls ไว้ใน Store

```javascript
// stores/todos.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_URL = 'https://xxx.mockapi.io/api/v1/todos'

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([])
  const loading = ref(false)

  // GET all
  const fetchTodos = async () => {
    loading.value = true
    const res = await fetch(API_URL)
    todos.value = await res.json()
    loading.value = false
  }

  // GET by id
  const fetchTodoById = async (id) => {
    const res = await fetch(`${API_URL}/${id}`)
    return await res.json()
  }

  // POST
  const addTodo = async (todo) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    })
    const newTodo = await res.json()
    todos.value.push(newTodo)
  }

  // PUT
  const updateTodo = async (id, data) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    await fetchTodos() // refresh
  }

  // DELETE
  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    todos.value = todos.value.filter(t => t.id !== id)
  }

  return {
    todos,
    loading,
    fetchTodos,
    fetchTodoById,
    addTodo,
    updateTodo,
    deleteTodo
  }
})
```

---

## 4. ใช้ใน Component

### โหลดข้อมูลตอนเปิดหน้า

```vue
<script setup>
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todos'

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<template>
  <div v-if="todoStore.loading">Loading...</div>
  <div v-else>
    <div v-for="todo in todoStore.todos" :key="todo.id">
      {{ todo.name }}
    </div>
  </div>
</template>
```

### เพิ่ม Todo

```vue
<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todos'

const todoStore = useTodoStore()
const newTodoName = ref('')

const handleAdd = async () => {
  if (!newTodoName.value) return
  await todoStore.addTodo({
    name: newTodoName.value,
    status: false
  })
  newTodoName.value = ''
}
</script>
```

---

## 5. Loading State

แสดง loading ระหว่างรอ API

```vue
<template>
  <button @click="handleSubmit" :disabled="loading">
    {{ loading ? 'กำลังบันทึก...' : 'บันทึก' }}
  </button>
</template>
```

---

## สรุป

| Concept | ใช้เมื่อ |
|---------|---------|
| **fetch()** | ยิง HTTP request |
| **async/await** | รอ response |
| **Pinia + API** | รวม API logic ไว้ที่เดียว |
| **Loading state** | แสดงสถานะระหว่างรอ |
| **onMounted** | โหลดข้อมูลตอนเปิดหน้า |

### HTTP Methods Cheatsheet

| Method | ใช้ทำอะไร | Body |
|--------|----------|------|
| GET | ดึงข้อมูล | ไม่มี |
| POST | สร้างใหม่ | มี |
| PUT | อัพเดท | มี |
| DELETE | ลบ | ไม่มี |
