<script setup>
// Chapter 8: Admin Order List
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminOrderStore } from '@/stores/admin/order'

const orderStore = useAdminOrderStore()

onMounted(() => {
  orderStore.loadOrders()
})
</script>

<template>
  <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Order</h1>
      <div class="divider"></div>
      <div class="overflow-x-auto card bg-base-100 shadow">
        <table class="table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Updated At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orderStore.list" :key="index">
              <td class="font-bold">{{ order.customerName }}</td>
              <td>{{ order.totalPrice }} ฿</td>
              <td><span class="badge badge-success">{{ order.status }}</span></td>
              <td>{{ order.updatedAt }}</td>
              <td>
                <RouterLink :to="{ name: 'admin-order-detail', params: { id: index } }" class="btn btn-sm btn-primary">
                  See detail
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>
