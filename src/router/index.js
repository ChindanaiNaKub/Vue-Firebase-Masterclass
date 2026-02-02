// Chapter 4: Vue Router Setup
import { createRouter, createWebHistory } from 'vue-router'
import BookListView from '../views/BookListView.vue'
import BookUpdateView from '../views/BookUpdateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
