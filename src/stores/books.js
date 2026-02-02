// Chapter 4: Pinia Store - Book Management
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBookStore = defineStore('books', () => {
  // State - รายการหนังสือ
  const books = ref([
    { id: 1, title: 'Vue.js 3 Fundamentals', author: 'John Doe', price: 450 },
    { id: 2, title: 'Firebase Complete Guide', author: 'Jane Smith', price: 550 },
    { id: 3, title: 'JavaScript Patterns', author: 'Bob Wilson', price: 390 }
  ])

  // Computed - นับจำนวนหนังสือ
  const bookCount = computed(() => books.value.length)

  // Computed - ราคารวมทั้งหมด
  const totalPrice = computed(() => {
    return books.value.reduce((sum, book) => sum + book.price, 0)
  })

  // Action - หาหนังสือจาก ID
  const getBookById = (id) => {
    return books.value.find(book => book.id === parseInt(id))
  }

  // Action - เพิ่มหนังสือ
  const addBook = (book) => {
    const newId = books.value.length > 0 
      ? Math.max(...books.value.map(b => b.id)) + 1 
      : 1
    books.value.push({
      id: newId,
      ...book
    })
  }

  // Action - อัพเดทหนังสือ
  const updateBook = (id, updatedBook) => {
    const index = books.value.findIndex(book => book.id === parseInt(id))
    if (index !== -1) {
      books.value[index] = {
        ...books.value[index],
        ...updatedBook
      }
    }
  }

  // Action - ลบหนังสือ
  const removeBook = (id) => {
    const index = books.value.findIndex(book => book.id === parseInt(id))
    if (index !== -1) {
      books.value.splice(index, 1)
    }
  }

  return {
    books,
    bookCount,
    totalPrice,
    getBookById,
    addBook,
    updateBook,
    removeBook
  }
})
