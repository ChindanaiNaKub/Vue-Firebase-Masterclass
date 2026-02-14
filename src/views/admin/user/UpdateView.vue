<script setup>
// Chapter 8: Admin User Update
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminUserStore } from '@/stores/admin/user'
import { useEventStore } from '@/stores/event'
import { RouterLink } from 'vue-router'

const userStore = useAdminUserStore()
const eventStore = useEventStore()
const route = useRoute()
const userId = ref(-1)
const userData = reactive({ name: '', role: '', status: '' })

onMounted(() => {
  if (route.params.id !== undefined) {
    userId.value = parseInt(route.params.id, 10)
    const u = userStore.getUser(userId.value)
    if (u) {
      userData.name = u.name
      userData.role = u.role
      userData.status = u.status
    }
  }
})

const updateUser = () => {
  userStore.updateUser(userId.value, userData)
  eventStore.popupMessage('success', 'Update User successful!')
}
</script>

<template>
  <div class="p-6">
      <div class="card bg-base-100 shadow-xl max-w-xl">
        <div class="card-body">
          <h1 class="text-2xl font-bold">Update user id: {{ userId }}</h1>
          <div class="divider"></div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">Name</span></label>
            <input v-model="userData.name" type="text" class="input input-bordered w-full" />
          </div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">Role</span></label>
            <select v-model="userData.role" class="select select-bordered w-full">
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="member">Member</option>
            </select>
          </div>
          <div class="form-control w-full mb-4">
            <label class="label"><span class="label-text">Status</span></label>
            <select v-model="userData.status" class="select select-bordered w-full">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div class="flex gap-2 mt-4">
            <RouterLink to="/admin/users" class="btn btn-ghost">Back</RouterLink>
            <button class="btn btn-primary" @click="updateUser">Update</button>
          </div>
        </div>
      </div>
  </div>
</template>
