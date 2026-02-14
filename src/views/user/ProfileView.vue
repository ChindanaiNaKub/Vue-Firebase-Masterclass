<script setup>
// Chapter 7: หน้า Profile - แก้ไข name, email, รูป
import { reactive, onMounted } from 'vue'
import { useEventStore } from '@/stores/event'

const eventStore = useEventStore()

const userForm = [
  { name: 'Email', field: 'email' },
  { name: 'Name', field: 'name' }
]

const userData = reactive({
  imageUrl: 'https://fastly.picsum.photos/id/64/200/200.jpg',
  email: '',
  name: ''
})

onMounted(() => {
  const saved = localStorage.getItem('user-profile')
  if (saved) {
    const profile = JSON.parse(saved)
    userData.imageUrl = profile.imageUrl || userData.imageUrl
    userData.email = profile.email || ''
    userData.name = profile.name || ''
  }
})

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      userData.imageUrl = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const updateProfile = () => {
  localStorage.setItem('user-profile', JSON.stringify(userData))
  eventStore.popupMessage('success', 'Update ข้อมูลเรียบร้อย')
}
</script>

<template>
  <div class="max-w-md mx-auto">
      <h1 class="text-2xl font-bold mb-6">Your profile</h1>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex flex-col items-center gap-4 mb-6">
            <div class="avatar">
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img :src="userData.imageUrl" alt="Profile" />
              </div>
            </div>
            <input
              type="file"
              class="file-input file-input-bordered file-input-sm w-full max-w-xs"
              accept="image/*"
              @change="handleFileChange"
            />
          </div>

          <div
            v-for="item in userForm"
            :key="item.field"
            class="form-control w-full mb-4"
          >
            <label class="label">
              <span class="label-text">{{ item.name }}</span>
            </label>
            <input
              v-model="userData[item.field]"
              type="text"
              class="input input-bordered w-full"
              :placeholder="item.name"
            />
          </div>

          <button class="btn btn-primary w-full" @click="updateProfile">
            Update profile
          </button>
        </div>
      </div>
  </div>
</template>
