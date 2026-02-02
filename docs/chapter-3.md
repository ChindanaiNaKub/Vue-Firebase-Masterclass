# Chapter 3: คุณสมบัติเพิ่มเติมของ Vue Component

## 1. Life Cycle

ลำดับการเกิด-ดับของ Component

```
setup → created → mounted → updated → unmounted
```

### การใช้งาน

```javascript
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('Component โหลดแล้ว')
  // เหมาะกับ: โหลดข้อมูลจาก API
})

onUnmounted(() => {
  console.log('Component ถูกลบ')
  // เหมาะกับ: cleanup, ยกเลิก subscription
})
```

---

## 2. Computed

ห่อ Logic แล้ว Return ค่า (มี Cache)

```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
// fullName จะ update เมื่อ firstName หรือ lastName เปลี่ยน
```

### Computed vs Method

| Computed | Method |
|----------|--------|
| มี Cache | ไม่มี Cache |
| Update เมื่อ dependency เปลี่ยน | เรียกใหม่ทุกครั้ง |
| ใช้กับการแสดงผล | ใช้กับ actions |

---

## 3. Watch

ดักจับการเปลี่ยนแปลงของตัวแปร

### Watch ตัวแปร ref

```javascript
import { ref, watch } from 'vue'

const name = ref('')

watch(name, (newVal, oldVal) => {
  console.log(`เปลี่ยนจาก ${oldVal} เป็น ${newVal}`)
})
```

### Watch ตัวแปร reactive (Object)

```javascript
import { reactive, watch } from 'vue'

const form = reactive({ name: '', age: 0 })

// ต้องใช้ deep: true
watch(form, (newVal) => {
  console.log('Form เปลี่ยน:', newVal)
}, { deep: true })

// หรือ watch เฉพาะ key
watch(
  () => form.name,
  (newVal) => console.log('Name:', newVal)
)
```

### watchEffect

Track ตัวแปรอัตโนมัติ + รันทันทีตอนเปิด

```javascript
import { watchEffect } from 'vue'

watchEffect(() => {
  console.log(`Name: ${form.name}, Age: ${form.age}`)
  // รันทันที และรันอีกเมื่อ form.name หรือ form.age เปลี่ยน
})
```

### Watch vs watchEffect

| watch | watchEffect |
|-------|-------------|
| ระบุตัวแปรที่จะ track | Track อัตโนมัติ |
| ไม่รันตอนเปิด | รันทันทีตอนเปิด |
| ได้ oldVal, newVal | ไม่ได้ oldVal |

---

## 4. Multi-Component

### สร้าง Component แยก

```vue
<!-- Counter.vue -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

### Import มาใช้

```vue
<!-- App.vue -->
<script setup>
import Counter from './components/Counter.vue'
</script>

<template>
  <Counter />
</template>
```

---

## 5. Props

ส่งข้อมูลจาก Parent → Child

### Child รับ Props

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps({
  message: String,
  count: Number
})
</script>

<template>
  <p>{{ message }} - {{ count }}</p>
</template>
```

### Parent ส่ง Props

```vue
<!-- Parent.vue -->
<script setup>
import Child from './Child.vue'
import { ref } from 'vue'

const msg = ref('Hello')
</script>

<template>
  <!-- Static Props -->
  <Child message="Hi" :count="10" />
  
  <!-- Dynamic Props -->
  <Child :message="msg" :count="5" />
</template>
```

### ส่ง Function ผ่าน Props

```vue
<!-- Parent.vue -->
<script setup>
const handleClick = () => alert('Clicked!')
</script>

<template>
  <Child :on-click="handleClick" />
</template>

<!-- Child.vue -->
<script setup>
const props = defineProps({
  onClick: Function
})
</script>

<template>
  <button @click="onClick">Click me</button>
</template>
```

---

## สรุป Chapter 3

| Concept | ใช้เมื่อไหร่ |
|---------|------------|
| Life Cycle | โหลดข้อมูลตอนเปิด, cleanup ตอนปิด |
| Computed | คำนวณค่าจากตัวแปรอื่น (มี cache) |
| Watch | ทำอะไรบางอย่างเมื่อตัวแปรเปลี่ยน |
| watchEffect | เหมือน watch แต่ track อัตโนมัติ |
| Multi-Component | แยก UI เป็นชิ้นเล็กๆ reuse ได้ |
| Props | ส่งข้อมูล/function จาก parent ไป child |
