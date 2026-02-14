<script setup>
// Chapter 7: หน้าชำระเงินสำเร็จ
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'

const userCartStore = useUserCartStore()

onMounted(() => {
  userCartStore.loadCheckout()
})
</script>

<template>
  <div class="max-w-2xl mx-auto text-center space-y-6">
      <div class="flex justify-center">
        <span class="text-6xl">✅</span>
      </div>
      <h1 class="text-3xl font-bold text-success">ชำระเงินสำเร็จ!</h1>

      <div v-if="userCartStore.lastCheckout && userCartStore.lastCheckout.orderNumber" class="card bg-base-100 shadow-xl text-left">
        <div class="card-body">
          <h2 class="card-title">Order #{{ userCartStore.lastCheckout.orderNumber }}</h2>
          <p class="text-sm opacity-70">{{ userCartStore.lastCheckout.createdAt }}</p>
          <div class="divider"></div>
          <div class="space-y-2">
            <div v-for="(item, i) in (userCartStore.lastCheckout.products || [])" :key="i" class="flex justify-between">
              <span>{{ item.name }} x {{ item.quantity }}</span>
              <span>{{ item.price * item.quantity }} ฿</span>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex justify-between font-bold text-lg">
            <span>ยอดรวม</span>
            <span>{{ userCartStore.lastCheckout.totalPrice }} ฿</span>
          </div>
        </div>
      </div>

      <RouterLink to="/" class="btn btn-primary">กลับหน้าหลัก</RouterLink>
  </div>
</template>
