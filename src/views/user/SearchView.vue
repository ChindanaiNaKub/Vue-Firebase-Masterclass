<script setup>
// Chapter 7: หน้าค้นหาสินค้า
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserProductStore } from '@/stores/user/product'
import { useUserCartStore } from '@/stores/user/cart'
import ProductList from '@/components/ProductList.vue'

const userProductStore = useUserProductStore()
const userCartStore = useUserCartStore()
const route = useRoute()
const router = useRouter()

const searchText = ref('')
const filterProducts = ref([])

watch(
  () => route.query.q,
  (newSearchText) => {
    searchText.value = newSearchText || ''
    filterProducts.value = userProductStore.filterProducts(searchText.value)
  },
  { immediate: true }
)

const addToCart = (productData) => {
  userCartStore.addToCart(productData)
  router.push({ name: 'cart' })
}
</script>

<template>
  <div class="space-y-4">
      <h1 class="text-2xl font-bold">
        Search: <span class="text-primary">{{ searchText || '(ทั้งหมด)' }}</span>
      </h1>

      <div v-if="filterProducts.length === 0" class="alert alert-warning shadow-lg">
        <span>Product not found</span>
      </div>

      <ProductList v-else :products="filterProducts" :add-to-cart="addToCart" />
  </div>
</template>
