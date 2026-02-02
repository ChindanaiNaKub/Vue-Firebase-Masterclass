<script setup>
// Chapter 4 Workshop: Book List View
// ใช้ Router + Pinia

import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/books'

const router = useRouter()
const bookStore = useBookStore()

// Navigate ไปหน้าเพิ่มหนังสือ
const goToCreate = () => {
  router.push({ name: 'book-create' })
}

// Navigate ไปหน้าแก้ไขหนังสือ
const goToEdit = (id) => {
  router.push({ name: 'book-edit', params: { id } })
}

// ลบหนังสือ
const handleDelete = (id) => {
  if (confirm('ต้องการลบหนังสือนี้?')) {
    bookStore.removeBook(id)
  }
}
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>📚 รายการหนังสือ</h1>
      <button @click="goToCreate" class="btn btn-primary">
        ➕ เพิ่มหนังสือ
      </button>
    </div>

    <!-- Stats -->
    <div class="stats">
      <div class="stat">
        <span class="stat-value">{{ bookStore.bookCount }}</span>
        <span class="stat-label">เล่ม</span>
      </div>
      <div class="stat">
        <span class="stat-value">฿{{ bookStore.totalPrice.toLocaleString() }}</span>
        <span class="stat-label">มูลค่ารวม</span>
      </div>
    </div>

    <!-- Book List -->
    <div class="book-list">
      <div v-if="bookStore.books.length === 0" class="empty">
        ยังไม่มีหนังสือ กดปุ่มเพิ่มหนังสือเพื่อเริ่มต้น
      </div>

      <div 
        v-for="book in bookStore.books" 
        :key="book.id" 
        class="book-card"
      >
        <div class="book-info">
          <h3>{{ book.title }}</h3>
          <p class="author">โดย {{ book.author }}</p>
          <p class="price">฿{{ book.price.toLocaleString() }}</p>
        </div>
        <div class="book-actions">
          <button @click="goToEdit(book.id)" class="btn btn-edit">
            ✏️ แก้ไข
          </button>
          <button @click="handleDelete(book.id)" class="btn btn-delete">
            🗑️ ลบ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
  color: #fff;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 25px;
  border-radius: 10px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #00cec9;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.book-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.empty {
  text-align: center;
  padding: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.6);
}

.book-card {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s, background 0.2s;
}

.book-card:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateX(5px);
}

.book-info h3 {
  margin: 0 0 5px 0;
  color: #fff;
}

.author {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.price {
  margin: 8px 0 0 0;
  color: #00cec9;
  font-weight: bold;
  font-size: 1.1rem;
}

.book-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(135deg, #00b894, #00cec9);
  color: white;
}

.btn-edit {
  background: rgba(52, 152, 219, 0.2);
  color: #3498db;
  border: 1px solid #3498db;
}

.btn-delete {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border: 1px solid #e74c3c;
}
</style>
