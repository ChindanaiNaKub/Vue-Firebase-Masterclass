<script setup>
// Chapter 4-6 Workshop: Book List View with Tailwind + DaisyUI
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/books'

const router = useRouter()
const bookStore = useBookStore()

const goToCreate = () => {
  router.push({ name: 'book-create' })
}

const goToEdit = (id) => {
  router.push({ name: 'book-edit', params: { id } })
}

const handleDelete = (id) => {
  if (confirm('ต้องการลบหนังสือนี้?')) {
    bookStore.removeBook(id)
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">📚 รายการหนังสือ</h1>
      <button @click="goToCreate" class="btn btn-primary">
        ➕ เพิ่มหนังสือ
      </button>
    </div>

    <!-- Stats -->
    <div class="stats shadow w-full mb-6">
      <div class="stat">
        <div class="stat-title">จำนวนหนังสือ</div>
        <div class="stat-value text-primary">{{ bookStore.bookCount }}</div>
        <div class="stat-desc">เล่ม</div>
      </div>
      <div class="stat">
        <div class="stat-title">มูลค่ารวม</div>
        <div class="stat-value text-secondary">฿{{ bookStore.totalPrice.toLocaleString() }}</div>
        <div class="stat-desc">บาท</div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="bookStore.books.length === 0" class="card bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <p class="text-4xl">📖</p>
        <p class="text-xl font-bold">ยังไม่มีหนังสือ</p>
        <p class="text-base-content/60">กดปุ่มเพิ่มหนังสือเพื่อเริ่มต้น</p>
        <button @click="goToCreate" class="btn btn-primary mt-4">
          ➕ เพิ่มหนังสือเล่มแรก
        </button>
      </div>
    </div>

    <!-- Book List -->
    <div class="space-y-3">
      <div 
        v-for="book in bookStore.books" 
        :key="book.id"
        class="card bg-base-100 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
      >
        <div class="card-body p-4 flex-row items-center gap-4">
          <!-- Book Icon -->
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-lg w-12">
              <span class="text-xl">📕</span>
            </div>
          </div>

          <!-- Book Info -->
          <div class="flex-1">
            <h3 class="font-bold text-lg">{{ book.title }}</h3>
            <p class="text-base-content/60 text-sm">โดย {{ book.author }}</p>
          </div>

          <!-- Price -->
          <div class="text-right">
            <span class="text-xl font-bold text-primary">฿{{ book.price.toLocaleString() }}</span>
          </div>

          <!-- Actions -->
          <div class="flex gap-2">
            <button 
              @click="goToEdit(book.id)" 
              class="btn btn-sm btn-info btn-outline"
            >
              ✏️ แก้ไข
            </button>
            <button 
              @click="handleDelete(book.id)" 
              class="btn btn-sm btn-error btn-outline"
            >
              🗑️ ลบ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
