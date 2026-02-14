// Chapter 4-8: Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// Chapter 7: E-commerce User
import UserLayout from '@/layouts/UserLayout.vue'
import HomeView from '@/views/user/HomeView.vue'
import SearchView from '@/views/user/SearchView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import CartView from '@/views/user/CartView.vue'
import CheckoutView from '@/views/user/CheckoutView.vue'
import SuccessView from '@/views/user/SuccessView.vue'

// Chapter 8: Admin
import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginView from '@/views/admin/LoginView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'
import AdminUserList from '@/views/admin/user/ListView.vue'
import AdminUserUpdate from '@/views/admin/user/UpdateView.vue'
import AdminOrderList from '@/views/admin/order/ListView.vue'
import AdminOrderDetail from '@/views/admin/order/DetailView.vue'

// Chapter 4-5: Workshop
import BookListView from '@/views/BookListView.vue'
import BookUpdateView from '@/views/BookUpdateView.vue'
import TodoListView from '@/views/TodoListView.vue'
import TodoEditView from '@/views/TodoEditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ============================================
    // Chapter 8: Admin (Backoffice)
    // ============================================
    {
      path: '/admin/login',
      name: 'admin-login',
      component: LoginView
    },
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: 'dashboard', name: 'admin-dashboard', component: DashboardView },
        { path: 'products', name: 'admin-products', component: AdminProductList },
        { path: 'products/create', name: 'admin-products-create', component: AdminProductUpdate },
        { path: 'products/edit/:id', name: 'admin-products-update', component: AdminProductUpdate },
        { path: 'users', name: 'admin-users', component: AdminUserList },
        { path: 'users/:id', name: 'admin-user-update', component: AdminUserUpdate },
        { path: 'orders', name: 'admin-orders', component: AdminOrderList },
        { path: 'orders/:id', name: 'admin-order-detail', component: AdminOrderDetail }
      ]
    },
    { path: '/admin', redirect: '/admin/dashboard' },

    // ============================================
    // Chapter 7: E-commerce (User) - Nested
    // ============================================
    {
      path: '/',
      component: UserLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'search', name: 'search', component: SearchView },
        { path: 'profile', name: 'profile', component: ProfileView },
        { path: 'cart', name: 'cart', component: CartView },
        { path: 'checkout', name: 'checkout', component: CheckoutView },
        { path: 'success', name: 'success', component: SuccessView }
      ]
    },

    // ============================================
    // Chapter 5: Todo List
    // ============================================
    { path: '/todo', name: 'todo-list', component: TodoListView },
    { path: '/todo/edit/:id', name: 'todo-edit', component: TodoEditView },

    // ============================================
    // Chapter 4: Book Store
    // ============================================
    { path: '/books', name: 'book-list', component: BookListView },
    { path: '/book/create', name: 'book-create', component: BookUpdateView },
    { path: '/book/edit/:id', name: 'book-edit', component: BookUpdateView }
  ]
})

export default router
