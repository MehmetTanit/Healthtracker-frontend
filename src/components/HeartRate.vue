<template>
  <div class="container">
    <h2>Herzfrequenzüberwachung</h2>
    <canvas ref="chartCanvas"></canvas>

    <!-- Eingabeformular -->
    <div class="form-container">
      <h2>Neuer HeartRateEintrag</h2>
      <span>Geben Sie hier ein in welcher Zeit (in Stunden) Sie das schaffen wollen</span>
      <input v-model="newHeartRate" type="text" placeholder="HeartRateWert">
      <button @click="submitHeartRate">Senden</button>
    </div>

    <!-- Anzeige der Einträge -->
    <div class="list-container">
      <h2>HeartRate Einträge</h2>
      <ul>
        <li v-for="heartRate in heartRates" :key="heartRate.id">
          <span>{{ heartRate.dateRecorded }}: {{ heartRate.heartRateValue }} BPM</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface HeartRate {
  id: number;
  heartRateValue: number;
  dateRecorded: string;
}

const heartRates = ref<HeartRate[]>([]);
const newHeartRate = ref('');

const fetchHeartRates = () => {
  axios.get(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/heartrate')
      .then(response => {
        heartRates.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching heart rate data:', error);
      });
};

const submitHeartRate = () => {
  const newHeartRateEntry = {
    heartRateValue: parseFloat(newHeartRate.value),
    dateRecorded: new Date().toISOString(),
  };

  axios.post(import.meta.env.VITE_APP_BACKEND_BASE_URL + '/heartrate', newHeartRateEntry)
      .then(() => {
        newHeartRate.value = '';
        fetchHeartRates();
      })
      .catch(error => {
        console.error('Error submitting heart rate data:', error);
      });
};

// Fetch heart rate data when component is mounted
onMounted(fetchHeartRates);
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.form-container {
  margin-top: 20px;
}

.form-container input {
  margin-bottom: 10px;
}

.list-container {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
</style>
