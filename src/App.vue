<script setup>
  import { reactive } from 'vue'

  const gendersList = ['ชาย', 'หญิง', 'ไม่ระบุ']
  const interestsList = ['หนังสือ', 'การเดินทาง', 'การอ่าน', 'การฟังเพลง']

  const formData = reactive({
    interests: []
  })

  const submitForm = () => {
    console.log(formData)
    console.log(formData.interests.join())
  }

</script>


<template>
  <div>
    <div>
      <div>ชือจริง</div>
      <input class="form" type="text" v-model="formData.firstname">
    </div>

    <div>
      <div>นามสกุล</div>
      <input class="form" type="text" v-model="formData.lastname">
    </div>

    <div>
      <div>Gender</div>
      <div v-for="gender in gendersList">
        <input type="radio" name="gender" :value="gender" v-model="formData.gender">
        {{ gender }}
      </div>
    </div>

    <div>
      <div>Interests</div>
      <div v-for="interest in interestsList">
        <input type="checkbox" name="interest" :value="interest" v-model="formData.interests">
        {{ interest }}
      </div>
    </div>

    <div>
      <div>คำอธิบายเพิ่มเติม</div>
      <textarea v-model="formData.description"></textarea>
    </div>
    
    <button @click="submitForm()"> ส่ง Form</button>

  </div>

</template>
