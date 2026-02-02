<script setup>
// Chapter 5 Workshop: Todo Edit View
// - ดึงข้อมูลจาก API ตาม id
// - แก้ไขและบันทึก

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoStore } from '@/stores/todos'

const router = useRouter()
const route = useRoute()
const todoStore = useTodoStore()

// Form data
const form = ref({
  name: '',
  status: false
})

const isLoading = ref(true)
const isSaving = ref(false)
const notFound = ref(false)

// โหลดข้อมูล Todo ตอนเปิดหน้า
onMounted(async () => {
  const todoId = route.params.id
  const todo = await todoStore.fetchTodoById(todoId)
  
  if (todo) {
    form.value = {
      name: todo.name,
      status: todo.status
    }
  } else {
    notFound.value = true
  }
  
  isLoading.value = false
})

// บันทึกการแก้ไข
const handleSubmit = async () => {
  if (!form.value.name.trim()) {
    alert('กรุณากรอกชื่อรายการ')
    return
  }

  isSaving.value = true
  const success = await todoStore.updateTodo(route.params.id, form.value)
  isSaving.value = false

  if (success) {
    alert('บันทึกสำเร็จ!')
    router.push({ name: 'todo-list' })
  }
}

// ยกเลิก
const handleCancel = () => {
  router.push({ name: 'todo-list' })
}
</script>

<template>
  <div class="container">
    <h1>✏️ แก้ไขรายการ</h1>

    <!-- Loading -->
    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>กำลังโหลดข้อมูล...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="notFound" class="not-found">
      <p>❌ ไม่พบรายการที่ต้องการแก้ไข</p>
      <button @click="handleCancel" class="btn">กลับหน้าหลัก</button>
    </div>

    <!-- Edit Form -->
    <form v-else @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label>ชื่อรายการ</label>
        <input 
          v-model="form.name"
          type="text"
          class="form-input"
          placeholder="กรอกชื่อรายการ"
          :disabled="isSaving"
        >
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input 
            v-model="form.status"
            type="checkbox"
            :disabled="isSaving"
          >
          <span>เสร็จแล้ว</span>
        </label>
      </div>

      <div class="form-actions">
        <button 
          type="button" 
          @click="handleCancel" 
          class="btn btn-cancel"
          :disabled="isSaving"
        >
          ❌ ยกเลิก
        </button>
        <button 
          type="submit" 
          class="btn btn-save"
          :disabled="isSaving"
        >
          {{ isSaving ? '⏳ กำลังบันทึก...' : '💾 บันทึก' }}
        </button>
      </div>
    </form>

    <!-- Preview -->
    <div v-if="!isLoading && !notFound" class="preview">
      <h3>👁️ Preview</h3>
      <div class="preview-card" :class="{ 'completed': form.status }">
        <span class="preview-status">{{ form.status ? '✅' : '⬜' }}</span>
        <span class="preview-name">{{ form.name || 'ชื่อรายการ' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
}

.loading, .not-found {
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
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

.form {
  background: rgba(255, 255, 255, 0.08);
  padding: 25px;
  border-radius: 12px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #00cec9;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.checkbox-label input {
  width: 20px;
  height: 20px;
  accent-color: #00cec9;
}

.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 25px;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-save {
  background: linear-gradient(135deg, #00b894, #00cec9);
  color: white;
}

.preview {
  margin-top: 30px;
}

.preview h3 {
  margin-bottom: 10px;
  opacity: 0.7;
}

.preview-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: opacity 0.3s;
}

.preview-card.completed {
  opacity: 0.6;
}

.preview-card.completed .preview-name {
  text-decoration: line-through;
}

.preview-status {
  font-size: 1.2rem;
}

.preview-name {
  font-size: 1rem;
}
</style>
