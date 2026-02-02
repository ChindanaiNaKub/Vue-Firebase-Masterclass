<script setup>
// Workshop Chapter 3: Multi-Component และ Props
// Component นี้รับ props จาก parent และแสดงผลข้อมูล form

import { computed, watch, onMounted, onUnmounted } from 'vue'

// กำหนด Props ที่รับเข้ามา
const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  onClear: {
    type: Function,
    default: null
  }
})

// ใช้ Computed เพื่อสร้าง fullName
const fullName = computed(() => {
  const first = props.formData.firstname || ''
  const last = props.formData.lastname || ''
  if (!first && !last) return 'ยังไม่ได้กรอกชื่อ'
  return `${first} ${last}`.trim()
})

// ใช้ Computed เพื่อนับจำนวน interests
const interestsCount = computed(() => {
  return props.formData.interests?.length || 0
})

// ใช้ Computed เพื่อตรวจสอบว่า form ครบถ้วนหรือไม่
const isFormComplete = computed(() => {
  return !!(
    props.formData.firstname &&
    props.formData.lastname &&
    props.formData.gender &&
    props.formData.interests?.length > 0
  )
})

// Life Cycle: onMounted
onMounted(() => {
  console.log('FormSummary Component ถูก mount แล้ว')
})

// Life Cycle: onUnmounted
onUnmounted(() => {
  console.log('FormSummary Component ถูก unmount แล้ว')
})
</script>

<template>
  <div class="summary-card">
    <h3>📋 สรุปข้อมูลที่กรอก</h3>
    
    <!-- แสดง Full Name จาก Computed -->
    <div class="summary-item">
      <span class="label">ชื่อ-นามสกุล:</span>
      <span class="value" :class="{ 'empty': !formData.firstname && !formData.lastname }">
        {{ fullName }}
      </span>
    </div>

    <!-- แสดง Gender -->
    <div class="summary-item">
      <span class="label">เพศ:</span>
      <span class="value" :class="{ 'empty': !formData.gender }">
        {{ formData.gender || 'ยังไม่ได้เลือก' }}
      </span>
    </div>

    <!-- แสดง Interests พร้อมจำนวน -->
    <div class="summary-item">
      <span class="label">ความสนใจ ({{ interestsCount }} รายการ):</span>
      <span class="value" :class="{ 'empty': interestsCount === 0 }">
        {{ formData.interests?.length ? formData.interests.join(', ') : 'ยังไม่ได้เลือก' }}
      </span>
    </div>

    <!-- แสดง Description -->
    <div class="summary-item" v-if="formData.description">
      <span class="label">คำอธิบาย:</span>
      <span class="value">{{ formData.description }}</span>
    </div>

    <!-- สถานะ Form -->
    <div class="status" :class="{ 'complete': isFormComplete, 'incomplete': !isFormComplete }">
      {{ isFormComplete ? '✅ กรอกข้อมูลครบแล้ว' : '⚠️ กรุณากรอกข้อมูลให้ครบ' }}
    </div>

    <!-- ปุ่ม Clear (ใช้ Function Props) -->
    <button v-if="onClear" @click="onClear" class="clear-btn">
      🗑️ ล้างข้อมูล
    </button>
  </div>
</template>

<style scoped>
.summary-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.summary-card h3 {
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

.summary-item {
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.label {
  font-weight: bold;
  opacity: 0.9;
}

.value {
  flex: 1;
}

.value.empty {
  opacity: 0.6;
  font-style: italic;
}

.status {
  margin-top: 15px;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

.status.complete {
  background: rgba(72, 187, 120, 0.3);
}

.status.incomplete {
  background: rgba(245, 158, 11, 0.3);
}

.clear-btn {
  margin-top: 15px;
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
