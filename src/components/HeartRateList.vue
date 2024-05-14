<template>
  <div class="container">
    <h2>Herzfrequenzüberwachung</h2>
    <canvas ref="chartCanvas"></canvas>
    <div class="list-container">
      <ul>
        <li v-for="(rate, index) in heartRates" :key="index">
          Datum: <strong>{{ formatDate(dates[index]) }}</strong>, Herzfrequenz: {{ rate }} BPM
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import '@/assets/HeartRateList.css';

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const heartRates = ref([70, 72, 68, 86, 45]);
const dates = ref(['2024-05-01', '2024-05-02', '2024-05-03', '2024-05-04', '2024-05-05']);

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('de-DE');
}

onMounted(() => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates.value,
          datasets: [{
            label: 'Herzfrequenz',
            data: heartRates.value,
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
});
</script>


