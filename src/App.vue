<script setup>
  import { ref } from 'vue'

  const items = ref(['items1', 'items2', 'items3'])
</script>

<template>
  <div>
    <ul>
      <li v-for="item in items">
        {{ item }}
      </li>
    </ul>
  </div>
</template>