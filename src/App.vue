<script setup>
import { reactive, ref, computed, watch, watchEffect, onMounted } from 'vue'

// Workshop Chapter 3: Import Component (Multi-Component)
import FormSummary from './components/FormSummary.vue'

const gendersList = ['ชาย', 'หญิง', 'ไม่ระบุ']
const interestsList = ['หนังสือ', 'การเดินทาง', 'การอ่าน', 'การฟังเพลง']

const formData = reactive({
  firstname: '',
  lastname: '',
  gender: '',
  interests: [],
  description: ''
})

// Workshop Chapter 3: ใช้ ref เพื่อติดตามจำนวนครั้งที่แก้ไข
const editCount = ref(0)

// ใช้ ref สำหรับ toggle การแสดง summary
const showSummary = ref(true)

// Workshop Chapter 3: Computed - คำนวณ Full Name
const fullName = computed(() => {
  if (!formData.firstname && !formData.lastname) {
    return 'รอกรอกข้อมูล...'
  }
  return `${formData.firstname} ${formData.lastname}`.trim()
})

// Workshop Chapter 3: Computed - ตรวจสอบ Form Validity
const formProgress = computed(() => {
  let completed = 0
  const total = 4
  
  if (formData.firstname) completed++
  if (formData.lastname) completed++
  if (formData.gender) completed++
  if (formData.interests.length > 0) completed++
  
  return Math.round((completed / total) * 100)
})

// Workshop Chapter 3: Watch - ดักจับการเปลี่ยนแปลงชื่อ
watch(
  () => formData.firstname,
  (newValue, oldValue) => {
    if (newValue !== oldValue && oldValue !== undefined) {
      console.log(`ชื่อเปลี่ยนจาก "${oldValue}" เป็น "${newValue}"`)
      editCount.value++
    }
  }
)

// Workshop Chapter 3: Watch - ดักจับการเปลี่ยนแปลง object ด้วย deep
watch(
  formData,
  (newValue) => {
    console.log('Form Data เปลี่ยนแปลง:', JSON.stringify(newValue))
  },
  { deep: true }
)

// Workshop Chapter 3: watchEffect - ดักจับ interests แบบอัตโนมัติ
watchEffect(() => {
  if (formData.interests.length > 0) {
    console.log(`✨ ความสนใจปัจจุบัน: ${formData.interests.join(', ')}`)
  }
})

// Workshop Chapter 3: Life Cycle - onMounted
onMounted(() => {
  console.log('🚀 App Component mounted!')
  console.log('📅 เวลาเริ่มต้น:', new Date().toLocaleString('th-TH'))
})

// Function สำหรับ submit form
const submitForm = () => {
  console.log('📤 ส่งข้อมูล:', formData)
  console.log('👤 ชื่อเต็ม:', fullName.value)
  console.log('📊 จำนวนครั้งที่แก้ไข:', editCount.value)
  alert(`ส่งข้อมูลสำเร็จ!\nชื่อ: ${fullName.value}\nความสนใจ: ${formData.interests.join(', ')}`)
}

// Workshop Chapter 3: Function Props - ส่งไปให้ child component
const clearForm = () => {
  formData.firstname = ''
  formData.lastname = ''
  formData.gender = ''
  formData.interests = []
  formData.description = ''
  editCount.value = 0
  console.log('🗑️ ล้างข้อมูลทั้งหมดแล้ว')
}
</script>

<template>
  <div class="container">
    <h1>📝 Workshop Chapter 3</h1>
    <p class="subtitle">Life Cycle, Computed, Watch, Multi-Component, Props</p>

    <!-- แสดง Progress Bar (ใช้ Computed) -->
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: formProgress + '%' }"></div>
      <span class="progress-text">กรอกข้อมูล {{ formProgress }}%</span>
    </div>

    <!-- แสดง Full Name แบบ Real-time (ใช้ Computed) -->
    <div class="preview-name">
      <span class="label">ชื่อ-นามสกุล:</span>
      <span class="name">{{ fullName }}</span>
      <span class="edit-count" v-if="editCount > 0">(แก้ไข {{ editCount }} ครั้ง)</span>
    </div>

    <div class="form-grid">
      <!-- Form Section -->
      <div class="form-section">
        <div class="form-group">
          <label>ชื่อจริง</label>
          <input class="form-input" type="text" v-model="formData.firstname" placeholder="กรอกชื่อจริง">
        </div>

        <div class="form-group">
          <label>นามสกุล</label>
          <input class="form-input" type="text" v-model="formData.lastname" placeholder="กรอกนามสกุล">
        </div>

        <div class="form-group">
          <label>เพศ</label>
          <div class="radio-group">
            <label v-for="gender in gendersList" :key="gender" class="radio-label">
              <input type="radio" name="gender" :value="gender" v-model="formData.gender">
              {{ gender }}
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>ความสนใจ</label>
          <div class="checkbox-group">
            <label v-for="interest in interestsList" :key="interest" class="checkbox-label">
              <input type="checkbox" :value="interest" v-model="formData.interests">
              {{ interest }}
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>คำอธิบายเพิ่มเติม</label>
          <textarea v-model="formData.description" class="form-textarea" placeholder="เขียนอะไรก็ได้..."></textarea>
        </div>

        <div class="button-group">
          <button @click="submitForm" class="btn btn-primary">✅ ส่ง Form</button>
          <button @click="showSummary = !showSummary" class="btn btn-secondary">
            {{ showSummary ? '🙈 ซ่อน' : '👁️ แสดง' }} Summary
          </button>
        </div>
      </div>

      <!-- Summary Section (Multi-Component + Props) -->
      <div class="summary-section" v-if="showSummary">
        <!-- 
          Workshop Chapter 3: ส่ง Props ไป child component
          - :formData = Dynamic Props (ส่ง Object)
          - :onClear = Function Props (ส่ง Function)
        -->
        <FormSummary 
          :form-data="formData" 
          :on-clear="clearForm"
        />
      </div>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 5px;
  font-size: 2rem;
}

.subtitle {
  text-align: center;
  opacity: 0.7;
  margin-bottom: 20px;
}

.progress-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  height: 30px;
  position: relative;
  margin-bottom: 20px;
  overflow: hidden;
}

.progress-bar {
  background: linear-gradient(90deg, #00b894, #00cec9);
  height: 100%;
  border-radius: 20px;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 0.9rem;
}

.preview-name {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.preview-name .label {
  opacity: 0.7;
}

.preview-name .name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #00cec9;
}

.preview-name .edit-count {
  opacity: 0.5;
  font-size: 0.8rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-section {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  opacity: 0.9;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s, background 0.3s;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #00cec9;
  background: rgba(255, 255, 255, 0.15);
}

.form-input::placeholder, .form-textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-textarea {
  min-height: 80px;
  resize: vertical;
}

.radio-group, .checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.radio-label, .checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  transition: background 0.3s;
}

.radio-label:hover, .checkbox-label:hover {
  background: rgba(255, 255, 255, 0.1);
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(135deg, #00b894, #00cec9);
  color: white;
}

.btn-primary:hover {
  box-shadow: 0 4px 15px rgba(0, 206, 201, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.summary-section {
  display: flex;
  flex-direction: column;
}
</style>
