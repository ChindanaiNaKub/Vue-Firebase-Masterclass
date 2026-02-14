<script setup>
// Chapter 7: หน้าหลัก - แสดงสินค้าทั้งหมด
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserProductStore } from '@/stores/user/product'
import { useUserCartStore } from '@/stores/user/cart'
import ProductList from '@/components/ProductList.vue'

const userProductStore = useUserProductStore()
const userCartStore = useUserCartStore()
const router = useRouter()

onMounted(() => {
  userProductStore.loadProduct()
})

const addToCart = (productData) => {
  userCartStore.addToCart(productData)
  router.push({ name: 'cart' })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Banner -->
    <div class="hero min-h-[200px] bg-primary/20 rounded-2xl">
      <div class="hero-content text-center">
        <div>
          <h1 class="text-4xl font-bold">Hello to shop</h1>
          <p class="py-4 opacity-90">Trust your intuition</p>
        </div>
      </div>
    </div>

    <!-- Product list -->
    <div>
      <h2 class="text-2xl font-bold mb-4">สินค้าทั้งหมด</h2>
      <ProductList :products="userProductStore.list" :add-to-cart="addToCart" />
    </div>
  </div>
</template>
