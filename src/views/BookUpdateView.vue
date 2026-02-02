<script setup>
// Chapter 4-6 Workshop: Book Create/Edit View with Tailwind + DaisyUI
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBookStore } from '@/stores/books'

const router = useRouter()
const route = useRoute()
const bookStore = useBookStore()

const isEditMode = computed(() => route.name === 'book-edit')
const pageTitle = computed(() => isEditMode.value ? '✏️ แก้ไขหนังสือ' : '➕ เพิ่มหนังสือใหม่')

const form = ref({
  title: '',
  author: '',
  price: 0
})

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
      alert('ไม่พบหนังสือที่ต้องการแก้ไข')
      router.push({ name: 'book-list' })
    }
  }
})

const handleSubmit = () => {
  if (!form.value.title || !form.value.author || form.value.price <= 0) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  if (isEditMode.value) {
    bookStore.updateBook(route.params.id, form.value)
    alert('อัพเดทหนังสือสำเร็จ!')
  } else {
    bookStore.addBook(form.value)
    alert('เพิ่มหนังสือสำเร็จ!')
  }

  router.push({ name: 'book-list' })
}

const handleCancel = () => {
  router.push({ name: 'book-list' })
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold">{{ pageTitle }}</h1>
    </div>

    <!-- Form Card -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <!-- Title -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text font-semibold">ชื่อหนังสือ</span>
            </label>
            <input 
              v-model="form.title" 
              type="text" 
              class="input input-bordered w-full"
              placeholder="กรอกชื่อหนังสือ"
            >
          </div>

          <!-- Author -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text font-semibold">ผู้แต่ง</span>
            </label>
            <input 
              v-model="form.author" 
              type="text" 
              class="input input-bordered w-full"
              placeholder="กรอกชื่อผู้แต่ง"
            >
          </div>

          <!-- Price -->
          <div class="form-control mb-6">
            <label class="label">
              <span class="label-text font-semibold">ราคา (บาท)</span>
            </label>
            <input 
              v-model.number="form.price" 
              type="number" 
              class="input input-bordered w-full"
              placeholder="กรอกราคา"
              min="0"
            >
          </div>

          <!-- Buttons -->
          <div class="flex gap-2">
            <button type="button" @click="handleCancel" class="btn btn-ghost flex-1">
              ❌ ยกเลิก
            </button>
            <button type="submit" class="btn btn-primary flex-1">
              {{ isEditMode ? '💾 บันทึก' : '➕ เพิ่มหนังสือ' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Preview Card -->
    <div class="mt-6" v-if="form.title || form.author">
      <h3 class="text-sm font-semibold text-base-content/60 mb-2">👁️ Preview</h3>
      <div class="card bg-gradient-to-r from-primary to-secondary text-primary-content shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{{ form.title || 'ชื่อหนังสือ' }}</h2>
          <p>โดย {{ form.author || 'ผู้แต่ง' }}</p>
          <div class="text-2xl font-bold">฿{{ (form.price || 0).toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
