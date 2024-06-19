<template>
  <div class="container">
    <h2>Herzfrequenzüberwachung</h2>
    <canvas ref="chartCanvas"></canvas>

    <!-- Eingabeformular -->
    <div>
      <h2>Neuer HeartRateEintrag</h2>
      <span>Geben Sie hier ein in welcher Zeit (in Stunden) Sie das schaffen wollen</span>
      <input v-model="newHeartRate.heartRateValue" type="text" placeholder="HeartRateWert">
      <button @click="submitHeartRate">Senden</button>
    </div>

    <!-- Liste der Herzfrequenzdaten -->
    <div class="list-container">
      <ul>
        <li v-for="(heartRate, index) in heartRates" :key="index">
          Datum: <strong>{{ formatDate(heartRate.dateRecorded) }}</strong>, Herzfrequenz: {{ heartRate.heartRateValue }}
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

// Referenzen und Zustände
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const heartRates = ref<HeartRate[]>([]);
const newHeartRate = ref<Partial<HeartRate>>({
  heartRateValue: 72
});
let chart: Chart | null = null;

// API-Endpunkt
const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
const endpoint = baseUrl + '/HeartRates';

// Hilfsfunktion zum Formatieren des Datums
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('de-DE');
}

// Funktion zum Abrufen der Herzfrequenzen
async function fetchHeartRates() {
  try {
    const response = await axios.get(endpoint);
    heartRates.value = response.data.map((entry: any) => new HeartRate(
        entry.id,
        new Date(entry.dateRecorded),
        entry.heartRateValue
    ));
    updateChart(); // Aktualisiere das Diagramm nach dem Abrufen der Daten
  } catch (error) {
    console.error('Fehler beim Abrufen der Herzfrequenzdaten:', error);
  }
}

// Funktion zum Speichern der Herzfrequenz
async function submitHeartRate() {
  const heartRateData = {
    dateRecorded: new Date(), // Setze das aktuelle Datum und die aktuelle Uhrzeit
    heartRateValue: newHeartRate.value.heartRateValue,
  };

  try {
    const response = await axios.post(endpoint, heartRateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Herzfrequenz gespeichert:', response.data);
    heartRates.value.push(new HeartRate(
        response.data.id,
        new Date(response.data.dateRecorded),
        response.data.heartRateValue,
    ));
    updateChart(); // Aktualisiere das Diagramm nach dem Speichern
  } catch (error) {
    console.error('Fehler beim Speichern der Herzfrequenz:', error);
  }
}

// Funktion zum Aktualisieren des Diagramms
function updateChart() {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');
    if (ctx) {
      if (chart) {
        chart.destroy(); // Zerstöre das alte Diagramm, wenn es existiert
      }
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: heartRates.value.map(hr => formatDate(hr.dateRecorded)),
          datasets: [{
            label: 'Herzfrequenz',
            data: heartRates.value.map(hr => hr.heartRateValue),
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
}

// Initiales Abrufen der Daten
onMounted(async () => {
  await fetchHeartRates();
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.form-container {
  margin-top: 20px;
}

.form-container form {
  display: flex;
  flex-direction: column;
}

.form-container label {
  margin-top: 10px;
}

.form-container input {
  margin-bottom: 10px;
}

.list-container {
  margin-top: 20px;
}
</style>
