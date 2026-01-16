<script setup>
  import { ref } from 'vue'

  const items = ref(['item1', 'item2', 'item3'])

  const addItem =() => {
    const itemLength = (items.value.length + 1)
    items.value.push('item' + itemLength)
  }
</script>

<template>
  <div>
    <ul>
      <li v-for="item in items">
        {{ item }}
      </li>
    </ul>
    <button @click="addItem()"> Add new item</button>
  </div>
</template>