<template>
  <div>
    <h3>{{ title }}</h3>
    <div>
      <label for="sleepDuration">Sleep Duration:</label>
      <input v-model="sleepDurationInput" id="sleepDuration" type="number">
      <button @click="saveSleepPattern">Save</button>
    </div>
    <div>
      <table v-if="sleepPatterns.length > 0">
        <thead>
        <tr>
          <th>Date Recorded</th>
          <th>Sleep Duration</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pattern in sleepPatterns" :key="pattern.id">
          <td>{{ pattern.dateRecorded }}</td>
          <td>{{ pattern.sleepDuration }}</td>
        </tr>
        </tbody>
      </table>
      <p v-else>No sleep patterns recorded yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { SleepPattern } from '@/model/SleepPattern';

defineProps<{
  title: string
}>()

const sleepPatterns = ref<SleepPattern[]>([])
const sleepDurationInput = ref<number>(0)

const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL // 'http://localhost:8080' in dev mode

async function saveSleepPattern() {
  const endpoint = `${baseUrl}/SleepPattern/sleeppattern`
  const currentDate = new Date().toISOString()
  const data = {
    dateRecorded: currentDate,
    sleepDuration: sleepDurationInput.value
  }
  try {
    const response = await axios.post<SleepPattern>(endpoint, data)
    const savedPattern = response.data
    sleepPatterns.value.push(savedPattern)
    sleepDurationInput.value = 0 // Reset input field after saving
  } catch (error) {
    console.error('Error saving sleep pattern:', error)
  }
}

async function loadSleepPatterns() {
  const endpoint = `${baseUrl}/SleepPattern/sleeppattern` // Adjusted endpoint for GET request
  try {
    const response = await axios.get<SleepPattern[]>(endpoint)
    sleepPatterns.value = response.data
  } catch (error) {
    console.error('Error loading sleep patterns:', error)
  }
}

// Lifecycle hook
onMounted(() => {
  loadSleepPatterns()
})
</script>

<style scoped>
h3 {
  text-align: center;
}
table {
  margin-left: auto;
  margin-right: auto;
}
button {
  color: blue;
}
</style>