<script setup>
// Chapter 7: Toast แจ้งเตือน - ใช้กับ event store
import { storeToRefs } from 'pinia'
import { useEventStore } from '@/stores/event'

const eventStore = useEventStore()
const { alert: showAlert, data } = storeToRefs(eventStore)
</script>

<template>
  <div v-if="showAlert" class="toast toast-top toast-end z-50">
    <div
      class="alert"
      :class="{
        'alert-success': data.status === 'success',
        'alert-error': data.status === 'error',
        'alert-info': data.status === 'info'
      }"
    >
      <span>{{ data.message }}</span>
    </div>
  </div>
</template>
