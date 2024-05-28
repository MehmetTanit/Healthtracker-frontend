<template>
  <div class="container">
    <h2>Herzfrequenzüberwachung</h2>
    <canvas ref="chartCanvas"></canvas>
    <div class="list-container">
      <ul>
        <li v-for="(heartRate, index) in heartRates" :key="index">
          Datum: <strong>{{ formatDate(heartRate.dateRecorded) }}</strong>, Herzfrequenz: {{ heartRate.value }} BPM
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { HeartRate } from '@/model/heartrate';
import '@/assets/HeartRate.css';

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const heartRates = ref<HeartRate[]>([]);

const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
const endpoint = baseUrl + '/HeartRate';

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('de-DE');
}

onMounted(async () => {
  try {
    const response = await axios.get(endpoint);
    const data = response.data;

    console.log('API-Antwortdaten:', data);

    heartRates.value = data.map((entry: any) => new HeartRate(
        entry.id,
        entry.userId,
        new Date(entry.dateRecorded),
        entry.value
    ));

    // Debugging: Protokolliere die verarbeiteten HeartRate-Objekte
    console.log('Verarbeitete Herzfrequenzen:', heartRates.value);

    if (chartCanvas.value) {
      const ctx = chartCanvas.value.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: heartRates.value.map(hr => formatDate(hr.dateRecorded)),
            datasets: [{
              label: 'Herzfrequenz',
              data: heartRates.value.map(hr => hr.value),
              borderColor: '#007BFF',
              borderWidth: 2,
              pointBackgroundColor: '#007BFF',
              pointBorderColor: '#FFF',
              pointBorderWidth: 2,
              pointRadius: 5,
              tension: 0.4
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            elements: {
              line: {
                tension: 0.4
              },
              point: {
                radius: 5
              }
            }
          }
        });
      }
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Herzfrequenzdaten:', error);
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.list-container {
  margin-top: 20px;
}
</style>
