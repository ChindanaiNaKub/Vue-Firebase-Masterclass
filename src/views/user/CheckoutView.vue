<script setup>
// Chapter 7: หน้าชำระเงิน - form ที่อยู่ + สรุปตะกร้า
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'

const checkoutForm = [
  { name: 'Email Address', field: 'email' },
  { name: 'Name', field: 'name' },
  { name: 'Address', field: 'address' },
  { name: 'Note', field: 'note' }
]

const userCartStore = useUserCartStore()
const userCheckoutData = reactive({
  email: '',
  name: '',
  address: '',
  note: ''
})
const router = useRouter()

const checkout = () => {
  userCartStore.checkout(userCheckoutData)
  router.push({ name: 'success' })
}
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-6">
      <!-- Form -->
      <div class="flex-1">
        <h1 class="text-2xl font-bold mb-4">Checkout</h1>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <div
              v-for="form in checkoutForm"
              :key="form.field"
              class="form-control w-full mb-4"
            >
              <label class="label">
                <span class="label-text">{{ form.name }}</span>
              </label>
              <input
                v-model="userCheckoutData[form.field]"
                type="text"
                class="input input-bordered w-full"
                :placeholder="form.name"
              />
            </div>
            <button
              class="btn btn-primary w-full"
              :disabled="userCartStore.items.length === 0"
              @click="checkout"
            >
              ชำระเงิน
            </button>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="lg:w-80 shrink-0">
        <div class="card bg-base-100 shadow-xl sticky top-4">
          <div class="card-body">
            <h2 class="card-title">Order summary</h2>
            <ul class="space-y-2 max-h-60 overflow-y-auto">
              <li
                v-for="(item, i) in userCartStore.items"
                :key="i"
                class="flex justify-between text-sm"
              >
                <span class="truncate flex-1">{{ item.name }}</span>
                <span class="shrink-0 ml-2">จำนวน: {{ item.quantity }}</span>
              </li>
            </ul>
            <RouterLink to="/cart" class="link link-primary text-sm">Edit</RouterLink>
            <div class="divider"></div>
            <div class="flex justify-between">
              <span>ราคาสินค้าทั้งหมด</span>
              <span>{{ userCartStore.summaryPrice }} ฿</span>
            </div>
            <div class="flex justify-between">
              <span>ค่าส่ง</span>
              <span>0 ฿</span>
            </div>
            <div class="flex justify-between font-bold">
              <span>ราคาทั้งสิ้น</span>
              <span>{{ userCartStore.summaryPrice }} ฿</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
