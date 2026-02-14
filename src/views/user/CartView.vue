<script setup>
// Chapter 7: หน้าตะกร้าสินค้า
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserCartStore } from '@/stores/user/cart'
import CloseIcon from '@/components/icons/Close.vue'

const userCartStore = useUserCartStore()
const router = useRouter()

const quantities = computed(() =>
  Array.from({ length: 20 }, (_, i) => i + 1)
)

const changeQuantity = (event, index) => {
  userCartStore.updateQuantity(index, event.target.value)
}

const removeItemInCart = (index) => {
  userCartStore.removeItemInCart(index)
  if (userCartStore.items.length === 0) {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-6">
      <!-- Cart items -->
      <div class="flex-1">
        <h1 class="text-2xl font-bold mb-4">Shopping cart</h1>

        <div v-if="userCartStore.items.length === 0" class="alert alert-info">
          <span>Cart is empty</span>
          <RouterLink to="/" class="btn btn-sm">ไปช็อป</RouterLink>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(item, index) in userCartStore.items"
            :key="index"
            class="card bg-base-100 shadow-md"
          >
            <div class="card-body flex-row gap-4 items-center p-4">
              <img
                :src="item.imageUrl"
                :alt="item.name"
                class="rounded-lg w-20 h-20 object-cover"
              />
              <div class="flex-1 min-w-0">
                <h3 class="font-bold truncate">{{ item.name }}</h3>
                <p class="text-sm text-base-content/70 line-clamp-1">{{ item.about }}</p>
                <p class="font-bold text-primary">{{ item.price }} ฿</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm">Quantity</span>
                <select
                  class="select select-bordered select-sm w-20"
                  :value="item.quantity"
                  @change="changeQuantity($event, index)"
                >
                  <option v-for="q in quantities" :key="q" :value="q">
                    {{ q }}
                  </option>
                </select>
              </div>
              <button
                class="btn btn-ghost btn-sm btn-square text-error"
                @click="removeItemInCart(index)"
                title="ลบ"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Order summary -->
      <div class="lg:w-80 shrink-0">
        <div class="card bg-base-100 shadow-xl sticky top-4">
          <div class="card-body">
            <h2 class="card-title">Order summary</h2>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span>ราคาสินค้าทั้งหมด</span>
                <span>{{ userCartStore.summaryPrice }} ฿</span>
              </div>
              <div class="flex justify-between">
                <span>ค่าส่ง</span>
                <span>0 ฿</span>
              </div>
              <div class="divider my-1"></div>
              <div class="flex justify-between font-bold text-lg">
                <span>ราคาทั้งสิ้น</span>
                <span>{{ userCartStore.summaryPrice }} ฿</span>
              </div>
            </div>
            <RouterLink
              to="/checkout"
              class="btn btn-primary w-full mt-4"
              :class="{ 'btn-disabled': userCartStore.items.length === 0 }"
            >
              ชำระเงิน
            </RouterLink>
          </div>
        </div>
      </div>
  </div>
</template>
