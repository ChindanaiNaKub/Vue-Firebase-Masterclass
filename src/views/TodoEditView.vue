<script setup>
// Chapter 5-6 Workshop: Todo Edit View with Tailwind + DaisyUI
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoStore } from '@/stores/todos'

const router = useRouter()
const route = useRoute()
const todoStore = useTodoStore()

// Form data
const form = ref({
  name: '',
  status: false
})

const isLoading = ref(true)
const isSaving = ref(false)
const notFound = ref(false)
const showToast = ref(false)

// โหลดข้อมูล Todo ตอนเปิดหน้า
onMounted(async () => {
  const todoId = route.params.id
  const todo = await todoStore.fetchTodoById(todoId)
  
  if (todo) {
    form.value = {
      name: todo.name,
      status: todo.status
    }
  } else {
    notFound.value = true
  }
  
  isLoading.value = false
})

// บันทึกการแก้ไข
const handleSubmit = async () => {
  if (!form.value.name.trim()) {
    alert('กรุณากรอกชื่อรายการ')
    return
  }

  isSaving.value = true
  const success = await todoStore.updateTodo(route.params.id, form.value)
  isSaving.value = false

  if (success) {
    // Show toast
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
      router.push({ name: 'todo-list' })
    }, 1500)
  }
}

// ยกเลิก
const handleCancel = () => {
  router.push({ name: 'todo-list' })
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <!-- Toast -->
    <div v-if="showToast" class="toast toast-top toast-end z-50">
      <div class="alert alert-success">
        <span>✅ บันทึกสำเร็จ!</span>
      </div>
    </div>

    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold">✏️ แก้ไขรายการ</h1>
      <span class="badge badge-primary mt-2">ID: {{ route.params.id }}</span>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center p-10">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="mt-4 text-base-content/60">กำลังโหลดข้อมูล...</p>
    </div>

    <!-- Not Found -->
    <div v-else-if="notFound" class="card bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <p class="text-4xl">❌</p>
        <p class="text-xl font-bold">ไม่พบรายการ</p>
        <p class="text-base-content/60">ไม่พบรายการที่ต้องการแก้ไข</p>
        <button @click="handleCancel" class="btn btn-primary mt-4">
          กลับหน้าหลัก
        </button>
      </div>
    </div>

    <!-- Edit Form -->
    <div v-else class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <!-- Name Input -->
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text font-semibold">ชื่อรายการ</span>
            </label>
            <input 
              v-model="form.name"
              type="text"
              class="input input-bordered w-full"
              placeholder="กรอกชื่อรายการ"
              :disabled="isSaving"
            >
          </div>

          <!-- Status -->
          <div class="form-control mb-6">
            <label class="label cursor-pointer justify-start gap-4">
              <input 
                v-model="form.status"
                type="checkbox"
                class="checkbox checkbox-primary"
                :disabled="isSaving"
              >
              <span class="label-text">เสร็จแล้ว</span>
              <span 
                class="badge ml-auto"
                :class="form.status ? 'badge-success' : 'badge-warning'"
              >
                {{ form.status ? 'Done' : 'Pending' }}
              </span>
            </label>
          </div>

          <!-- Buttons -->
          <div class="flex gap-2">
            <button 
              type="button" 
              @click="handleCancel" 
              class="btn btn-ghost flex-1"
              :disabled="isSaving"
            >
              ❌ ยกเลิก
            </button>
            <button 
              type="submit" 
              class="btn btn-primary flex-1"
              :disabled="isSaving"
            >
              <span v-if="isSaving" class="loading loading-spinner loading-sm"></span>
              <span v-else>💾 บันทึก</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Preview Card -->
    <div v-if="!isLoading && !notFound" class="mt-6">
      <h3 class="text-sm font-semibold text-base-content/60 mb-2">👁️ Preview</h3>
      <div class="card bg-base-100 shadow">
        <div class="card-body p-4 flex-row items-center gap-4">
          <input 
            type="checkbox"
            :checked="form.status"
            class="checkbox checkbox-primary"
            disabled
          >
          <span 
            class="flex-1"
            :class="{ 'line-through opacity-50': form.status }"
          >
            {{ form.name || 'ชื่อรายการ' }}
          </span>
          <span 
            class="badge"
            :class="form.status ? 'badge-success' : 'badge-warning'"
          >
            {{ form.status ? 'Done' : 'Pending' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
