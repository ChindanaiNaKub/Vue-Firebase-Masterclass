<script setup>
// Chapter 7: แสดงรายการสินค้า - ใช้ใน HomeView และ SearchView
defineProps({
  products: {
    type: Array,
    required: true
  },
  addToCart: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <div
      v-for="product in products"
      :key="product.name"
      class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
    >
      <figure class="px-4 pt-4">
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="rounded-xl object-cover h-48 w-full"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ product.name }}</h2>
        <p class="text-sm text-base-content/70 line-clamp-2">{{ product.about }}</p>
        <p class="font-bold text-primary text-lg">{{ product.price }} ฿</p>
        <div class="card-actions justify-end mt-2">
          <button
            class="btn btn-primary btn-sm"
            :disabled="product.quantity <= 0"
            @click="addToCart(product)"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
