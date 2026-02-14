<script setup>
// Chapter 8: Admin Product Create / Edit
import { onMounted, ref, reactive, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/product'
import { useEventStore } from '@/stores/event'
const productStore = useAdminProductStore()
const eventStore = useEventStore()
const route = useRoute()
const router = useRouter()
const productId = ref(-1)
const selectedProduct = reactive({
  name: '',
  imageUrl: '',
  quantity: 0,
  price: 0,
  about: '',
  status: 'open'
})

const mode = computed(() => (productId.value !== -1 ? 'Edit' : 'Add'))

onMounted(() => {
  if (route.params.id !== undefined) {
    productId.value = parseInt(route.params.id, 10)
    const p = productStore.getProduct(productId.value)
    if (p) {
      selectedProduct.name = p.name
      selectedProduct.imageUrl = p.imageUrl || ''
      selectedProduct.quantity = p.quantity || 0
      selectedProduct.price = p.price != null ? p.price : 0
      selectedProduct.about = p.about || ''
      selectedProduct.status = p.status || 'open'
    }
  }
})

const updateProduct = () => {
  if (productId.value !== -1) {
    productStore.updateProduct(productId.value, selectedProduct)
    eventStore.popupMessage('success', 'Update Product successful!')
  } else {
    productStore.addProduct(selectedProduct)
    eventStore.popupMessage('success', 'Create Product successful!')
    router.push({ name: 'admin-products' })
  }
}
</script>

<template>
  <div class="p-6">
      <div class="card bg-base-100 shadow-xl max-w-2xl">
        <div class="card-body">
          <h1 class="text-2xl font-bold">{{ mode }} Product</h1>
          <div class="divider"></div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">Name</span></label>
            <input v-model="selectedProduct.name" type="text" class="input input-bordered w-full" placeholder="Product name" />
          </div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">Image URL</span></label>
            <input v-model="selectedProduct.imageUrl" type="text" class="input input-bordered w-full" placeholder="https://..." />
          </div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">Price</span></label>
            <input v-model.number="selectedProduct.price" type="number" class="input input-bordered w-full" placeholder="0" />
          </div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">Quantity</span></label>
            <input v-model.number="selectedProduct.quantity" type="number" class="input input-bordered w-full" placeholder="0" />
          </div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">About</span></label>
            <input v-model="selectedProduct.about" type="text" class="input input-bordered w-full" placeholder="Description" />
          </div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">Status</span></label>
            <select v-model="selectedProduct.status" class="select select-bordered w-full">
              <option value="open">Open</option>
              <option value="close">Close</option>
            </select>
          </div>
          <div class="flex gap-2 mt-4">
            <RouterLink to="/admin/products" class="btn btn-ghost">Back</RouterLink>
            <button class="btn btn-primary" @click="updateProduct">{{ mode }}</button>
          </div>
        </div>
      </div>
  </div>
</template>
