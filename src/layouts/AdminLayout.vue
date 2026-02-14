<script setup>
// Chapter 8: Admin Layout - Sidebar + RouterView
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pageData = [
  { name: 'Dashboard', route: '/admin/dashboard' },
  { name: 'Product', route: '/admin/products' },
  { name: 'Order', route: '/admin/orders' },
  { name: 'User', route: '/admin/users' },
  { name: 'Logout', route: '/admin/login' }
]

const currentPath = computed(() => route.path)

const isActive = (r) => currentPath.value === r || currentPath.value.startsWith(r + '/')

const goLogout = () => {
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen flex bg-base-200" data-theme="night">
    <!-- Sidebar -->
    <aside class="w-64 min-h-screen bg-base-100 shadow-lg flex flex-col">
      <div class="p-4 border-b border-base-300">
        <span class="text-xl font-bold text-primary">Admin</span>
      </div>
      <ul class="menu p-4 gap-2 flex-1">
        <li v-for="page in pageData" :key="page.route">
          <RouterLink
            v-if="page.name !== 'Logout'"
            :to="page.route"
            class="flex items-center gap-2"
            :class="{ 'active': isActive(page.route) }"
          >
            {{ page.name }}
          </RouterLink>
          <button
            v-else
            type="button"
            class="flex items-center gap-2"
            @click="goLogout"
          >
            {{ page.name }}
          </button>
        </li>
      </ul>
    </aside>
    <!-- Main -->
    <main class="flex-1 overflow-auto">
      <RouterView />
    </main>
  </div>
</template>
