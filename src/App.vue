<script setup>
  import {ref} from 'vue'

  const isCheck = ref(false)

  const toggleCheck = () => {
    isCheck.value = !isCheck.value
  }


</script>

<template>
  <div>
    <div v-if="isCheck">
      แสดงคำนี้ออกมา
    </div>
    <button @click="toggleCheck()"> กดเพื่อเปิด</button>
  </div>
</template>