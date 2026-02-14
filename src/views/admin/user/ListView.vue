<script setup>
// Chapter 8: Admin User List
import { RouterLink } from 'vue-router'
import { useAdminUserStore } from '@/stores/admin/user'

const userStore = useAdminUserStore()

const toggleStatus = (index) => {
  const u = userStore.list[index]
  u.status = u.status === 'inactive' ? 'active' : 'inactive'
  userStore.updateUser(index, u)
}
</script>

<template>
  <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">User</h1>
      <div class="divider"></div>
      <div class="overflow-x-auto card bg-base-100 shadow">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Updated At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userStore.list" :key="index">
              <td class="font-bold">{{ user.name }}</td>
              <td>{{ user.role }}</td>
              <td>
                <span class="badge" :class="user.status === 'active' ? 'badge-success' : 'badge-ghost'">
                  {{ user.status }}
                </span>
              </td>
              <td>{{ user.updatedAt }}</td>
              <td>
                <RouterLink :to="{ name: 'admin-user-update', params: { id: index } }" class="btn btn-sm btn-ghost">Edit</RouterLink>
                <button type="button" class="btn btn-sm btn-ghost mx-2" @click="toggleStatus(index)">
                  {{ user.status === 'active' ? 'Disable' : 'Enable' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>
