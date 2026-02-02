<script setup>
// Chapter 4 Workshop: Book Create/Edit View
// ใช้ Router params + Pinia

import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBookStore } from '@/stores/books'

const router = useRouter()
const route = useRoute()
const bookStore = useBookStore()

// ตรวจสอบ mode จาก route name
const isEditMode = computed(() => route.name === 'book-edit')
const pageTitle = computed(() => isEditMode.value ? '✏️ แก้ไขหนังสือ' : '➕ เพิ่มหนังสือใหม่')

// Form data
const form = ref({
  title: '',
  author: '',
  price: 0
})

// โหลดข้อมูลหนังสือ (ถ้าเป็น edit mode)
onMounted(() => {
  if (isEditMode.value) {
    const bookId = route.params.id
    const book = bookStore.getBookById(bookId)
    if (book) {
      form.value = {
        title: book.title,
        author: book.author,
        price: book.price
      }
    } else {
      // ไม่พบหนังสือ กลับไปหน้า list
      alert('ไม่พบหนังสือที่ต้องการแก้ไข')
      router.push({ name: 'book-list' })
    }
  }
})

// Submit form
const handleSubmit = () => {
  // Validate
  if (!form.value.title || !form.value.author || form.value.price <= 0) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  if (isEditMode.value) {
    // Update
    bookStore.updateBook(route.params.id, form.value)
    alert('อัพเดทหนังสือสำเร็จ!')
  } else {
    // Create
    bookStore.addBook(form.value)
    alert('เพิ่มหนังสือสำเร็จ!')
  }

  // กลับไปหน้า list
  router.push({ name: 'book-list' })
}

// Cancel
const handleCancel = () => {
  router.push({ name: 'book-list' })
}
</script>

<template>
  <div class="container">
    <h1>{{ pageTitle }}</h1>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label>ชื่อหนังสือ</label>
        <input 
          v-model="form.title" 
          type="text" 
          class="form-input"
          placeholder="กรอกชื่อหนังสือ"
        >
      </div>

      <div class="form-group">
        <label>ผู้แต่ง</label>
        <input 
          v-model="form.author" 
          type="text" 
          class="form-input"
          placeholder="กรอกชื่อผู้แต่ง"
        >
      </div>

      <div class="form-group">
        <label>ราคา (บาท)</label>
        <input 
          v-model.number="form.price" 
          type="number" 
          class="form-input"
          placeholder="กรอกราคา"
          min="0"
        >
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn btn-cancel">
          ❌ ยกเลิก
        </button>
        <button type="submit" class="btn btn-submit">
          {{ isEditMode ? '💾 บันทึก' : '➕ เพิ่มหนังสือ' }}
        </button>
      </div>
    </form>

    <!-- Preview -->
    <div class="preview" v-if="form.title || form.author">
      <h3>👁️ Preview</h3>
      <div class="preview-card">
        <h4>{{ form.title || 'ชื่อหนังสือ' }}</h4>
        <p>โดย {{ form.author || 'ผู้แต่ง' }}</p>
        <p class="preview-price">฿{{ (form.price || 0).toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #fff;
  margin-bottom: 20px;
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
  color: rgba(255, 255, 255, 0.9);
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
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #00cec9;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
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
  transition: transform 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-submit {
  background: linear-gradient(135deg, #00b894, #00cec9);
  color: white;
}

.preview {
  margin-top: 30px;
}

.preview h3 {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
}

.preview-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  border-radius: 12px;
}

.preview-card h4 {
  margin: 0 0 5px 0;
  color: #fff;
}

.preview-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.preview-price {
  margin-top: 10px !important;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff !important;
}
</style>
