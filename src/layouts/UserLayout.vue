<script setup>
// Chapter 7: Layout หลักฝั่ง User - Navbar + Footer + slot
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'

const isLoggedIn = ref(false)
const router = useRouter()
const searchText = ref('')
const cartDropdownOpen = ref(false)
const userMenuOpen = ref(false)

const userCartStore = useUserCartStore()

onMounted(() => {
  if (localStorage.getItem('login')) {
    isLoggedIn.value = true
  }
})

const login = () => {
  isLoggedIn.value = true
  localStorage.setItem('login', 'true')
}

const logout = () => {
  isLoggedIn.value = false
  localStorage.removeItem('login')
  localStorage.removeItem('cart-item')
  localStorage.removeItem('checkout-data')
  window.location.reload()
}

const handleSearchEnter = (event) => {
  if (event.key === 'Enter') {
    router.push({ name: 'search', query: { q: searchText.value } })
    userMenuOpen.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-200" data-theme="night">
    <!-- Navbar -->
    <nav class="navbar bg-base-100 shadow-lg px-4">
      <div class="flex-1 gap-4">
        <RouterLink to="/" class="btn btn-ghost text-xl font-bold text-primary">
          🛒 Mikelopster Shop
        </RouterLink>

        <!-- Search (desktop) -->
        <div class="form-control hidden sm:flex w-full max-w-xs">
          <input
            v-model="searchText"
            type="text"
            placeholder="ค้นหาสินค้า..."
            class="input input-bordered w-full"
            @keyup="handleSearchEnter"
          />
        </div>
      </div>

      <div class="flex-none gap-2">
        <!-- Cart dropdown -->
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle indicator">
            <span class="text-2xl">🛒</span>
            <span
              v-if="userCartStore.quantity > 0"
              class="badge badge-sm badge-primary indicator-item"
            >
              {{ userCartStore.quantity }}
            </span>
          </label>
          <div tabindex="0" class="dropdown-content z-50 w-72 rounded-box border border-base-300 bg-base-100 p-4 shadow-xl mt-3">
            <div class="space-y-2">
              <p class="font-bold text-base">Order summary</p>
              <div class="flex justify-between text-sm">
                <span>{{ userCartStore.quantity }} รายการ</span>
                <span>{{ userCartStore.summaryPrice }} ฿</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>ค่าส่ง</span>
                <span>0 ฿</span>
              </div>
              <div class="border-t border-base-300 pt-2 mt-2 flex justify-between font-bold">
                <span>ราคาทั้งสิ้น</span>
                <span>{{ userCartStore.summaryPrice }} ฿</span>
              </div>
              <RouterLink
                to="/cart"
                class="btn btn-primary btn-sm w-full mt-3 normal-case"
                @click="cartDropdownOpen = false"
              >
                ดูตะกร้า
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Login / User menu -->
        <div v-if="!isLoggedIn" class="flex items-center">
          <button class="btn btn-ghost" @click="login">Login</button>
        </div>
        <div v-else class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
            <span class="bg-neutral text-neutral-content rounded-full w-10">👤</span>
          </label>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3">
            <li><RouterLink to="/profile">Profile</RouterLink></li>
            <li><button @click="logout">Logout</button></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Search mobile -->
    <div class="sm:hidden px-4 py-2 bg-base-100 border-b border-base-300">
      <input
        v-model="searchText"
        type="text"
        placeholder="ค้นหาสินค้า... กด Enter"
        class="input input-bordered w-full"
        @keyup="handleSearchEnter"
      />
    </div>

    <!-- Main content (child route = HomeView, SearchView, etc.) -->
    <main class="flex-1 container mx-auto p-4 max-w-6xl">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="footer footer-center p-6 bg-base-100 text-base-content border-t border-base-300">
      <div class="grid grid-flow-col gap-4">
        <RouterLink to="/" class="link link-hover">Home</RouterLink>
        <RouterLink to="/search" class="link link-hover">Search</RouterLink>
        <RouterLink to="/profile" class="link link-hover">Profile</RouterLink>
        <RouterLink to="/todo" class="link link-hover">Workshop (Todo)</RouterLink>
        <RouterLink to="/books" class="link link-hover">Workshop (Books)</RouterLink>
        <RouterLink to="/admin/login" class="link link-hover">Admin</RouterLink>
      </div>
      <div>
        <p class="text-sm opacity-70">Vue Firebase Masterclass - Chapter 7: Easy E-commerce</p>
      </div>
    </footer>
  </div>
</template>
