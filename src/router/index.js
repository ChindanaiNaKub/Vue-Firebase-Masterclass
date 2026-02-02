// Chapter 4-5: Vue Router Setup
import { createRouter, createWebHistory } from 'vue-router'

// Chapter 4: Book Views
import BookListView from '../views/BookListView.vue'
import BookUpdateView from '../views/BookUpdateView.vue'

// Chapter 5: Todo Views
import TodoListView from '../views/TodoListView.vue'
import TodoEditView from '../views/TodoEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ============================================
    // Chapter 5: Todo List (API)
    // ============================================
    {
      path: '/',
      name: 'todo-list',
      component: TodoListView
    },
    {
      path: '/todo/edit/:id',
      name: 'todo-edit',
      component: TodoEditView
    },

    // ============================================
    // Chapter 4: Book Store
    // ============================================
    {
      path: '/books',
      name: 'book-list',
      component: BookListView
    },
    {
      path: '/book/create',
      name: 'book-create',
      component: BookUpdateView
    },
    {
      path: '/book/edit/:id',
      name: 'book-edit',
      component: BookUpdateView
    }
  ]
})

export default router
