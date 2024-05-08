<template>
  <div>
    <h2>Herzfrequenzüberwachung</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const chartCanvas = ref<HTMLCanvasElement | null>(null);
const heartRates = ref([70, 72, 68, 86, 45]);
const dates = ref(['2024-05-01', '2024-05-02', '2024-05-03', '2024-05-04', '2024-05-05']);

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
            borderColor: 'red',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
});
</script>

<style scoped>
/* Stile für diese Komponente */
</style>
