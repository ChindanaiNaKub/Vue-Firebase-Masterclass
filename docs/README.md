# 📚 Vue Firebase Masterclass - สรุปบทเรียน

## บทเรียนทั้งหมด

| Chapter | หัวข้อ | เนื้อหาหลัก |
|---------|-------|------------|
| [1](./chapter-1.md) | แนะนำ Vue และ Firebase | Vue คืออะไร, Firebase services, Setup project |
| [2](./chapter-2.md) | Vue Component และ Concept | Component, ref, reactive, v-model, v-if, v-for |
| [3](./chapter-3.md) | คุณสมบัติเพิ่มเติม | Life Cycle, Computed, Watch, Props |
| [4](./chapter-4.md) | Router และ Pinia | Vue Router, Pinia Store, Navigation |
| [5](./chapter-5.md) | ต่อ API | Fetch API, CRUD, Loading State |
| [6](./chapter-6.md) | Tailwind + DaisyUI | Utility CSS, Components |
| [7](./chapter-7.md) | Easy E-commerce (User) | Layout, Product, Cart, Checkout |
| [8](./chapter-8.md) | ฝั่ง Admin (Backoffice) | Login, Dashboard, Product/User/Order |

---

## Quick Reference

### Reactive Variables

```javascript
// ตัวแปรพื้นฐาน
const count = ref(0)
count.value++

// Object/Array
const user = reactive({ name: '', age: 0 })
user.name = 'John'
```

### Template Syntax

```vue
{{ data }}           <!-- แสดงข้อมูล -->
:attr="value"        <!-- bind attribute -->
v-model="text"       <!-- two-way binding -->
v-if="condition"     <!-- แสดงตามเงื่อนไข -->
v-for="i in list"    <!-- วนลูป -->
@click="fn"          <!-- event handler -->
```

### Computed & Watch

```javascript
// Computed - คำนวณค่า (มี cache)
const fullName = computed(() => `${first.value} ${last.value}`)

// Watch - ดักจับการเปลี่ยนแปลง
watch(name, (newVal) => console.log(newVal))

// watchEffect - track อัตโนมัติ
watchEffect(() => console.log(name.value))
```

### Props

```javascript
// รับ props
const props = defineProps({ message: String })

// ใช้ใน template
<Child :message="msg" :on-click="handleClick" />
```

---

## อ่านเพิ่ม

- [Nuxt vs Vue](nuxt-vs-vue.md) – ทำไมใช้ Nuxt ทั้งที่มี Vue แล้ว (อ้างอิง [คลิป](https://www.youtube.com/watch?v=FSomc5aOgKE), [บทความ](https://mikelopster.dev/posts/nuxt-vs-vue))

## Workshop Files

- `src/App.vue` - Form พร้อม computed, watch, props
- `src/components/FormSummary.vue` - Child component รับ props

---

## รันโปรเจค

```bash
npm install
npm run dev
```

เปิด http://localhost:5173
