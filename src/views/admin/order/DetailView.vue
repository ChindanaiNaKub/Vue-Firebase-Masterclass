<script setup>
// Chapter 8: Admin Order Detail
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminOrderStore } from '@/stores/admin/order'
import { RouterLink } from 'vue-router'

const route = useRoute()
const orderStore = useAdminOrderStore()
const orderId = ref(-1)
const orderData = reactive({ products: [], no: '', updatedAt: '', paymentMethod: '', address: '', totalPrice: '' })

onMounted(() => {
  if (route.params.id !== undefined) {
    orderId.value = parseInt(route.params.id, 10)
    const o = orderStore.getOrder(orderId.value)
    if (o) {
      orderData.no = o.no
      orderData.updatedAt = o.updatedAt
      orderData.paymentMethod = o.paymentMethod
      orderData.address = o.address
      orderData.totalPrice = o.totalPrice
      orderData.products = o.products || []
    }
  }
})
</script>

<template>
  <div class="p-6">
      <div class="card bg-base-100 shadow-xl max-w-3xl">
        <div class="card-body">
          <h1 class="text-2xl font-bold">Order detail id: {{ orderId }}</h1>
          <div class="divider"></div>
          <div class="grid gap-4">
            <div class="flex justify-between">
              <span class="font-semibold">Order date</span>
              <span>{{ orderData.updatedAt }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Order Number</span>
              <span>{{ orderData.no }}</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold">Payment method</span>
              <span>{{ orderData.paymentMethod }}</span>
            </div>
            <div>
              <span class="font-semibold">Address</span>
              <p class="mt-1">{{ orderData.address }}</p>
            </div>
          </div>
          <div class="divider"></div>
          <h2 class="font-bold">Products</h2>
          <div class="space-y-2">
            <div
              v-for="(product, i) in orderData.products"
              :key="i"
              class="flex items-center gap-4 p-3 bg-base-200 rounded-lg"
            >
              <img v-if="product.imageUrl" :src="product.imageUrl" :alt="product.name" class="w-16 h-16 object-cover rounded" />
              <div class="flex-1">
                <p class="font-bold">{{ product.name }}</p>
                <p class="text-sm opacity-70">{{ product.description }}</p>
                <p class="text-sm">จำนวน {{ product.quantity }} ชิ้น · {{ product.price }} ฿</p>
              </div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex justify-between font-bold text-lg">
            <span>ราคาสินค้าทั้งหมด</span>
            <span>{{ orderData.totalPrice }} ฿</span>
          </div>
          <RouterLink to="/admin/orders" class="btn btn-ghost mt-4">Back</RouterLink>
        </div>
      </div>
  </div>
</template>
