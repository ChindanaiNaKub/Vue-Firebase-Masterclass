<script setup>
  import { ref } from 'vue'

  const fullname = ref('')


</script>

<template>
  <div>
    {{ fullname }}
    <input type="text"v-model="fullname" />
  </div>
</template>