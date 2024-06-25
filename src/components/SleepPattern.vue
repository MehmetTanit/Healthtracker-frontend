<template>
  <div class="container">
    <h2>Schlafmusterüberwachung</h2>
    <canvas ref="chartCanvas"></canvas>

    <!-- Eingabeformular -->
    <div class="form-container">
      <h3>Neuer SchlafmusterEintrag</h3>
      <label for="sleepDuration">Schlafdauer (Stunden):</label>
      <input v-model="sleepDurationInput" id="sleepDuration" type="number" placeholder="Schlafdauer">
      <button @click="saveSleepPattern">Speichern</button>
    </div>

    <!-- Liste der Schlafmuster -->
    <div class="list-container">
      <table v-if="sleepPatterns.length > 0">
        <thead>
        <tr>
          <th>Datum</th>
          <th>Schlafdauer (Stunden)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(pattern, index) in sleepPatterns" :key="index">
          <td>{{ formatDate(pattern.dateRecorded) }}</td>
          <td>{{ pattern.sleepDuration }}</td>
        </tr>
        </tbody>
      </table>
      <p v-else>Noch keine Schlafmuster aufgezeichnet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { SleepPattern } from '@/model/SleepPattern';
import '@/assets/SleepPattern.css';

// Referenzen und Zustände
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const sleepPatterns = ref<SleepPattern[]>([]);
const sleepDurationInput = ref<number>(0);
let chart: Chart | null = null;

// API-Endpunkt
const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
const endpoint = `${baseUrl}/SleepPattern/sleeppattern`;

// Hilfsfunktion zum Formatieren des Datums
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('de-DE');
}

// Funktion zum Abrufen der Schlafmuster
async function fetchSleepPatterns() {
  try {
    const response = await axios.get(endpoint);
    sleepPatterns.value = response.data.map((entry: any) => new SleepPattern(
        entry.id,
        entry.dateRecorded,
        entry.sleepDuration
    ));
    updateChart(); // Aktualisiere das Diagramm nach dem Abrufen der Daten
  } catch (error) {
    console.error('Fehler beim Abrufen der Schlafmuster:', error);
  }
}

// Funktion zum Speichern der Schlafmuster
async function saveSleepPattern() {
  const sleepPatternData = {
    dateRecorded: new Date().toISOString(), // Setze das aktuelle Datum und die aktuelle Uhrzeit im ISO-Format
    sleepDuration: sleepDurationInput.value,
  };

  try {
    const response = await axios.post(endpoint, sleepPatternData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Schlafmuster gespeichert:', response.data);
    const newPattern = new SleepPattern(
        response.data.id,
        response.data.dateRecorded,
        response.data.sleepDuration
    );
    sleepPatterns.value.push(newPattern);
    sleepDurationInput.value = 0; // Reset the input field
    updateChart(); // Aktualisiere das Diagramm nach dem Speichern
  } catch (error) {
    console.error('Fehler beim Speichern des Schlafmusters:', error);
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
          labels: sleepPatterns.value.map(sp => formatDate(sp.dateRecorded)),
          datasets: [{
            label: 'Schlafdauer (Stunden)',
            data: sleepPatterns.value.map(sp => sp.sleepDuration),
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
  await fetchSleepPatterns();
});
</script>


