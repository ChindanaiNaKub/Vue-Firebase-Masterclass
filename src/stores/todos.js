// Chapter 5: Pinia Store + API
// Todo List Store ที่ต่อกับ API
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ============================================
// ⚠️ เปลี่ยน URL นี้เป็น MockAPI ของคุณเอง
// สมัครได้ที่: https://mockapi.io/
// ============================================
// const API_URL = 'https://YOUR_PROJECT_ID.mockapi.io/api/v1/todos'

// สำหรับ Workshop: ใช้ localStorage จำลอง API
// (มี delay เพื่อจำลอง network latency)
const STORAGE_KEY = 'vue-todos'
const FAKE_DELAY = 500 // ms

// Helper: จำลอง API delay
const fakeApiDelay = () => new Promise(resolve => setTimeout(resolve, FAKE_DELAY))

// Helper: อ่านจาก localStorage
const getStoredTodos = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  if (data) return JSON.parse(data)
  // ข้อมูลเริ่มต้น
  return [
    { id: '1', name: 'เรียน Vue.js', status: true },
    { id: '2', name: 'เรียน Pinia', status: true },
    { id: '3', name: 'ทำ Workshop Chapter 5', status: false },
    { id: '4', name: 'เรียน Firebase', status: false }
  ]
}

// Helper: เขียนลง localStorage
const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export const useTodoStore = defineStore('todos', () => {
  // ============================================
  // State
  // ============================================
  const todos = ref([])
  const loading = ref(false)
  const error = ref(null)

  // ============================================
  // Computed
  // ============================================
  const todoCount = computed(() => todos.value.length)
  const completedCount = computed(() => todos.value.filter(t => t.status).length)
  const pendingCount = computed(() => todos.value.filter(t => !t.status).length)

  // ============================================
  // Actions - API Methods
  // ============================================

  // GET - ดึง Todo ทั้งหมด
  const fetchTodos = async () => {
    loading.value = true
    error.value = null
    try {
      await fakeApiDelay()
      todos.value = getStoredTodos()

      // ถ้าใช้ MockAPI จริง:
      // const res = await fetch(API_URL)
      // todos.value = await res.json()
    } catch (e) {
      error.value = 'ไม่สามารถโหลดข้อมูลได้'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  // GET - ดึง Todo ตาม ID
  const fetchTodoById = async (id) => {
    loading.value = true
    try {
      await fakeApiDelay()
      const allTodos = getStoredTodos()
      return allTodos.find(t => t.id === id) || null

      // ถ้าใช้ MockAPI จริง:
      // const res = await fetch(`${API_URL}/${id}`)
      // return await res.json()
    } finally {
      loading.value = false
    }
  }

  // POST - เพิ่ม Todo ใหม่
  const addTodo = async (todoData) => {
    loading.value = true
    error.value = null
    try {
      await fakeApiDelay()
      
      const newTodo = {
        id: Date.now().toString(),
        name: todoData.name,
        status: todoData.status || false
      }
      
      const allTodos = getStoredTodos()
      allTodos.push(newTodo)
      saveTodos(allTodos)
      todos.value = allTodos

      // ถ้าใช้ MockAPI จริง:
      // const res = await fetch(API_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(todoData)
      // })
      // const newTodo = await res.json()
      // todos.value.push(newTodo)

      return newTodo
    } catch (e) {
      error.value = 'ไม่สามารถเพิ่มข้อมูลได้'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  // PUT - อัพเดท Todo
  const updateTodo = async (id, todoData) => {
    loading.value = true
    error.value = null
    try {
      await fakeApiDelay()
      
      const allTodos = getStoredTodos()
      const index = allTodos.findIndex(t => t.id === id)
      if (index !== -1) {
        allTodos[index] = { ...allTodos[index], ...todoData }
        saveTodos(allTodos)
        todos.value = allTodos
      }

      // ถ้าใช้ MockAPI จริง:
      // await fetch(`${API_URL}/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(todoData)
      // })
      // await fetchTodos()

      return true
    } catch (e) {
      error.value = 'ไม่สามารถอัพเดทข้อมูลได้'
      console.error(e)
      return false
    } finally {
      loading.value = false
    }
  }

  // DELETE - ลบ Todo
  const deleteTodo = async (id) => {
    loading.value = true
    error.value = null
    try {
      await fakeApiDelay()
      
      const allTodos = getStoredTodos()
      const filtered = allTodos.filter(t => t.id !== id)
      saveTodos(filtered)
      todos.value = filtered

      // ถ้าใช้ MockAPI จริง:
      // await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      // todos.value = todos.value.filter(t => t.id !== id)

      return true
    } catch (e) {
      error.value = 'ไม่สามารถลบข้อมูลได้'
      console.error(e)
      return false
    } finally {
      loading.value = false
    }
  }

  // Toggle status
  const toggleStatus = async (id) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      await updateTodo(id, { status: !todo.status })
    }
  }

  return {
    // State
    todos,
    loading,
    error,
    // Computed
    todoCount,
    completedCount,
    pendingCount,
    // Actions
    fetchTodos,
    fetchTodoById,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleStatus
  }
})
