<script setup>
// Chapter 8: Admin Login (mock)
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const login = () => {
  if (!email.value.trim()) return
  localStorage.setItem('admin-login', 'true')
  router.push('/admin/dashboard')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4" data-theme="night">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title text-2xl justify-center mb-4">Login</h1>
        <div class="form-control">
          <label class="label"><span class="label-text">Email</span></label>
          <input
            v-model="email"
            type="email"
            placeholder="admin@example.com"
            class="input input-bordered"
          />
        </div>
        <div class="form-control mt-2">
          <label class="label"><span class="label-text">Password</span></label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="input input-bordered"
          />
        </div>
        <button class="btn btn-primary mt-6" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>
