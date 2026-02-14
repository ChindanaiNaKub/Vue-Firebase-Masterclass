<script setup>
// Chapter 8: Admin Product List
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminProductStore } from '@/stores/admin/product'
import { useEventStore } from '@/stores/event'
import EditIcon from '@/components/icons/Edit.vue'
import TrashIcon from '@/components/icons/Trash.vue'

const productStore = useAdminProductStore()
const eventStore = useEventStore()

onMounted(() => {
  productStore.loadProduct()
})

const removeProduct = (index) => {
  if (!confirm('ต้องการลบสินค้านี้?')) return
  productStore.removeProduct(index)
  eventStore.popupMessage('success', 'DELETE Successful!')
}
</script>

<template>
  <div class="p-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Product</h1>
        <RouterLink to="/admin/products/create" class="btn btn-primary btn-sm">
          Add New
        </RouterLink>
      </div>
      <div class="overflow-x-auto card bg-base-100 shadow">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Updated At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productStore.list" :key="index">
              <td class="font-bold">{{ product.name }}</td>
              <td>
                <img :src="product.imageUrl" :alt="product.name" class="w-12 h-12 object-cover rounded" />
              </td>
              <td>{{ product.price }} ฿</td>
              <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
              <td>
                <span class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-ghost'">
                  {{ product.status }}
                </span>
              </td>
              <td class="text-sm opacity-70">{{ product.updatedAt }}</td>
              <td>
                <div class="flex gap-2">
                  <RouterLink :to="{ name: 'admin-products-update', params: { id: index } }" class="btn btn-ghost btn-sm">
                    <EditIcon />
                  </RouterLink>
                  <button type="button" class="btn btn-ghost btn-sm text-error" @click="removeProduct(index)">
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>
