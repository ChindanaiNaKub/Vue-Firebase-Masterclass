<script setup>
// Chapter 4-8: App - RouterView + Toast + โหลด cart + product
import { onMounted } from 'vue'
import { useUserCartStore } from '@/stores/user/cart'
import { useAdminProductStore } from '@/stores/admin/product'
import Toast from '@/components/Toast.vue'

const userCartStore = useUserCartStore()
const adminProductStore = useAdminProductStore()

onMounted(() => {
  userCartStore.loadCart()
  adminProductStore.loadProduct() // เซ็ต product-data (ฝั่งร้านโหลดจากนี้)
})
</script>

<template>
  <div class="min-h-screen bg-base-200" data-theme="night">
    <RouterView />
    <Toast />
  </div>
</template>
