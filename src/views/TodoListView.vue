<script setup>
// Chapter 5-6 Workshop: Todo List View with Tailwind + DaisyUI
import { ref, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useTodoStore } from '@/stores/todos'

const router = useRouter()
const todoStore = useTodoStore()

// Input สำหรับเพิ่ม todo ใหม่
const newTodoName = ref('')
const isAdding = ref(false)

// Tab filter
const activeTab = ref('all') // 'all', 'pending', 'done'

// Filtered todos ตาม tab
const filteredTodos = computed(() => {
  if (activeTab.value === 'pending') {
    return todoStore.todos.filter(t => !t.status)
  } else if (activeTab.value === 'done') {
    return todoStore.todos.filter(t => t.status)
  }
  return todoStore.todos
})

// โหลดข้อมูลตอนเปิดหน้า
onMounted(() => {
  todoStore.fetchTodos()
})

// เพิ่ม Todo
const handleAdd = async () => {
  if (!newTodoName.value.trim()) return
  
  isAdding.value = true
  await todoStore.addTodo({
    name: newTodoName.value.trim(),
    status: false
  })
  newTodoName.value = ''
  isAdding.value = false
}

// Toggle status
const handleToggle = async (id) => {
  await todoStore.toggleStatus(id)
}

// ไปหน้า Edit
const goToEdit = (id) => {
  router.push({ name: 'todo-edit', params: { id } })
}

// ลบ Todo
const handleDelete = async (id) => {
  if (confirm('ต้องการลบรายการนี้?')) {
    await todoStore.deleteTodo(id)
  }
}
</script>

<template>
  <div class="relative">
    <div class="mb-4">
      <RouterLink to="/" class="link link-hover text-sm">← กลับร้านค้า</RouterLink>
    </div>
    <!-- Loading Overlay -->
    <div v-if="todoStore.loading" class="absolute inset-0 bg-base-300/50 flex items-center justify-center z-50 rounded-lg">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold">✅ Todo List</h1>
      <p class="text-base-content/60">Chapter 6: Tailwind + DaisyUI</p>
    </div>

    <!-- Stats -->
    <div class="stats shadow w-full mb-6">
      <div class="stat">
        <div class="stat-title">ทั้งหมด</div>
        <div class="stat-value text-primary">{{ todoStore.todoCount }}</div>
      </div>
      <div class="stat">
        <div class="stat-title">เสร็จแล้ว</div>
        <div class="stat-value text-success">{{ todoStore.completedCount }}</div>
      </div>
      <div class="stat">
        <div class="stat-title">ยังไม่เสร็จ</div>
        <div class="stat-value text-warning">{{ todoStore.pendingCount }}</div>
      </div>
    </div>

    <!-- Add Todo Form -->
    <div class="flex gap-2 mb-6">
      <input 
        v-model="newTodoName"
        type="text"
        class="input input-bordered flex-1"
        placeholder="เพิ่มรายการใหม่..."
        @keyup.enter="handleAdd"
        :disabled="isAdding"
      >
      <button 
        @click="handleAdd" 
        class="btn btn-primary"
        :disabled="isAdding || !newTodoName.trim()"
      >
        <span v-if="isAdding" class="loading loading-spinner loading-sm"></span>
        <span v-else>➕ เพิ่ม</span>
      </button>
    </div>

    <!-- Tabs -->
    <div class="tabs tabs-boxed mb-4 justify-center">
      <a 
        class="tab" 
        :class="{ 'tab-active': activeTab === 'all' }"
        @click="activeTab = 'all'"
      >
        ทั้งหมด ({{ todoStore.todoCount }})
      </a>
      <a 
        class="tab" 
        :class="{ 'tab-active': activeTab === 'pending' }"
        @click="activeTab = 'pending'"
      >
        ยังไม่เสร็จ ({{ todoStore.pendingCount }})
      </a>
      <a 
        class="tab" 
        :class="{ 'tab-active': activeTab === 'done' }"
        @click="activeTab = 'done'"
      >
        เสร็จแล้ว ({{ todoStore.completedCount }})
      </a>
    </div>

    <!-- Empty State -->
    <div v-if="!todoStore.loading && filteredTodos.length === 0" class="card bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <p class="text-4xl">📝</p>
        <p class="text-base-content/60">ไม่มีรายการ</p>
      </div>
    </div>

    <!-- Todo List -->
    <div class="space-y-2">
      <div 
        v-for="todo in filteredTodos" 
        :key="todo.id"
        class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
      >
        <div class="card-body p-4 flex-row items-center gap-4">
          <!-- Checkbox -->
          <input 
            type="checkbox"
            :checked="todo.status"
            @change="handleToggle(todo.id)"
            class="checkbox checkbox-primary"
          >
          
          <!-- Todo Name -->
          <span 
            class="flex-1 text-lg"
            :class="{ 'line-through opacity-50': todo.status }"
          >
            {{ todo.name }}
          </span>

          <!-- Badge -->
          <span 
            class="badge"
            :class="todo.status ? 'badge-success' : 'badge-warning'"
          >
            {{ todo.status ? 'Done' : 'Pending' }}
          </span>

          <!-- Actions -->
          <div class="flex gap-2">
            <button 
              @click="goToEdit(todo.id)" 
              class="btn btn-sm btn-ghost btn-square"
              title="แก้ไข"
            >
              ✏️
            </button>
            <button 
              @click="handleDelete(todo.id)" 
              class="btn btn-sm btn-ghost btn-square text-error"
              title="ลบ"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
