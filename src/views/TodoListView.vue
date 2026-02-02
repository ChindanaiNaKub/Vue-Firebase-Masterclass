<script setup>
// Chapter 5 Workshop: Todo List View
// - โหลดข้อมูลจาก API ตอน mounted
// - แสดง loading state
// - CRUD operations

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '@/stores/todos'

const router = useRouter()
const todoStore = useTodoStore()

// Input สำหรับเพิ่ม todo ใหม่
const newTodoName = ref('')
const isAdding = ref(false)

// โหลดข้อมูลตอนเปิดหน้า (Life Cycle)
onMounted(() => {
  todoStore.fetchTodos()
})

// เพิ่ม Todo
const handleAdd = async () => {
  if (!newTodoName.value.trim()) return
  
  isAdding.value = true
  await todoStore.addTodo({
    name: newTodoName.value.trim(),
    status: false
  })
  newTodoName.value = ''
  isAdding.value = false
}

// Toggle status
const handleToggle = async (id) => {
  await todoStore.toggleStatus(id)
}

// ไปหน้า Edit
const goToEdit = (id) => {
  router.push({ name: 'todo-edit', params: { id } })
}

// ลบ Todo
const handleDelete = async (id) => {
  if (confirm('ต้องการลบรายการนี้?')) {
    await todoStore.deleteTodo(id)
  }
}
</script>

<template>
  <div class="container">
    <h1>✅ Todo List</h1>
    <p class="subtitle">Chapter 5: ต่อ API กับ Vue</p>

    <!-- Stats -->
    <div class="stats">
      <div class="stat">
        <span class="stat-value">{{ todoStore.todoCount }}</span>
        <span class="stat-label">ทั้งหมด</span>
      </div>
      <div class="stat completed">
        <span class="stat-value">{{ todoStore.completedCount }}</span>
        <span class="stat-label">เสร็จแล้ว</span>
      </div>
      <div class="stat pending">
        <span class="stat-value">{{ todoStore.pendingCount }}</span>
        <span class="stat-label">ยังไม่เสร็จ</span>
      </div>
    </div>

    <!-- Add Todo Form -->
    <div class="add-form">
      <input 
        v-model="newTodoName"
        type="text"
        class="add-input"
        placeholder="เพิ่มรายการใหม่..."
        @keyup.enter="handleAdd"
        :disabled="isAdding"
      >
      <button 
        @click="handleAdd" 
        class="btn btn-add"
        :disabled="isAdding || !newTodoName.trim()"
      >
        {{ isAdding ? '⏳' : '➕' }} เพิ่ม
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="todoStore.loading && !todoStore.todos.length" class="loading">
      <div class="spinner"></div>
      <p>กำลังโหลดข้อมูล...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="todoStore.error" class="error">
      ❌ {{ todoStore.error }}
    </div>

    <!-- Empty State -->
    <div v-else-if="!todoStore.todos.length" class="empty">
      <p>📝 ยังไม่มีรายการ</p>
      <p>เพิ่มรายการใหม่ด้านบน</p>
    </div>

    <!-- Todo List -->
    <div v-else class="todo-list">
      <div 
        v-for="todo in todoStore.todos" 
        :key="todo.id"
        class="todo-item"
        :class="{ 'completed': todo.status }"
      >
        <div class="todo-left">
          <input 
            type="checkbox"
            :checked="todo.status"
            @change="handleToggle(todo.id)"
            class="todo-checkbox"
          >
          <span class="todo-name">{{ todo.name }}</span>
        </div>
        <div class="todo-actions">
          <button @click="goToEdit(todo.id)" class="btn-icon btn-edit" title="แก้ไข">
            ✏️
          </button>
          <button @click="handleDelete(todo.id)" class="btn-icon btn-delete" title="ลบ">
            🗑️
          </button>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="todoStore.loading && todoStore.todos.length" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

h1 {
  text-align: center;
  margin-bottom: 5px;
}

.subtitle {
  text-align: center;
  opacity: 0.6;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 25px;
}

.stat {
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 10px;
  text-align: center;
  min-width: 80px;
}

.stat.completed .stat-value {
  color: #00b894;
}

.stat.pending .stat-value {
  color: #fdcb6e;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #00cec9;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.7;
}

.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
}

.add-input:focus {
  outline: none;
  border-color: #00cec9;
}

.add-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.btn-add {
  padding: 12px 20px;
  background: linear-gradient(135deg, #00b894, #00cec9);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.btn-add:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading, .error, .empty {
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.error {
  color: #e74c3c;
}

.empty {
  opacity: 0.6;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #00cec9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: transform 0.2s, background 0.2s;
}

.todo-item:hover {
  background: rgba(255, 255, 255, 0.12);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-name {
  text-decoration: line-through;
}

.todo-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #00cec9;
}

.todo-name {
  font-size: 1rem;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s;
}

.btn-icon:hover {
  transform: scale(1.1);
}

.btn-edit {
  background: rgba(52, 152, 219, 0.2);
}

.btn-delete {
  background: rgba(231, 76, 60, 0.2);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}
</style>
