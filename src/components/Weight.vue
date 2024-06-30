<template>
  <div class="container">
    <h2>Gewichtsüberwachung</h2>
    <canvas ref="chartCanvas" class="chart" width="200" height="50"></canvas>

    <!-- Eingabeformular -->
    <div class="form-container">
      <h3>Neuer Gewichtseintrag</h3>
      <label for="weight">Gewicht (kg):</label>
      <input v-model="weightInput" id="weight" type="number" placeholder="Gewicht">

      <label for="height">Größe (cm):</label>
      <input v-model="heightInput" id="height" type="number" placeholder="Größe">

      <label for="weightGoal">Gewichtsziel (kg):</label>
      <input v-model="weightGoalInput" id="weightGoal" type="number" placeholder="Gewichtsziel">

      <label for="weeklyGoal">Wöchentliches Ziel (kg):</label>
      <input v-model="weeklyGoalInput" id="weeklyGoal" type="number" placeholder="Wöchentliches Ziel">

      <button @click="saveWeight" class="btn-save">Speichern</button>
    </div>

    <!-- Liste der Gewichtseinträge -->
    <div class="list-container">
      <table v-if="weights.length > 0">
        <thead>
        <tr>
          <th>Datum</th>
          <th>Gewicht (kg)</th>
          <th>Größe (cm)</th>
          <th>Gewichtsziel (kg)</th>
          <th>Wöchentliches Ziel (kg)</th>
          <th>Aktion</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(entry, index) in weights" :key="index">
          <td>{{ formatDate(entry.dateRecorded) }}</td>
          <td>{{ entry.weight }}</td>
          <td>{{ entry.height }}</td>
          <td>{{ entry.weightGoal }}</td>
          <td>{{ entry.weeklyGoal }}</td>
          <td><button @click="deleteWeight(entry.id)" class="btn-delete">Löschen</button></td>
        </tr>
        </tbody>
      </table>
      <p v-else>Noch keine Gewichtseinträge aufgezeichnet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

// Definiere die Weight-Klasse
class Weight {
  id: number;
  dateRecorded: Date;
  weight: number;
  height: number;
  weightGoal: number;
  weeklyGoal: number;

  constructor(id: number, dateRecorded: Date, weight: number, height: number, weightGoal: number, weeklyGoal: number) {
    this.id = id;
    this.dateRecorded = dateRecorded;
    this.weight = weight;
    this.height = height;
    this.weightGoal = weightGoal;
    this.weeklyGoal = weeklyGoal;
  }
}

// Referenzen und Zustände
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const weights = ref<Weight[]>([]);
const weightInput = ref<number>(0);
const heightInput = ref<number>(0);
const weightGoalInput = ref<number>(0);
const weeklyGoalInput = ref<number>(0);
let chart: Chart | null = null;

// API-Endpunkt
const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;
const endpoint = `${baseUrl}/Weights`;

// Hilfsfunktion zum Formatieren des Datums
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('de-DE');
}

// Funktion zum Abrufen der Gewichtseinträge
async function fetchWeights() {
  try {
    const response = await axios.get(endpoint);
    weights.value = response.data.map((entry: any) => new Weight(
        entry.id,
        new Date(entry.dateRecorded),
        entry.weight,
        entry.height,
        entry.weightGoal,
        entry.weeklyGoal
    ));
    updateChart();
  } catch (error) {
    console.error('Fehler beim Abrufen der Gewichtsdaten:', error);
  }
}

// Funktion zum Speichern eines neuen Gewichtseintrags
async function saveWeight() {
  const weightData = {
    dateRecorded: new Date().toISOString(),
    weight: weightInput.value,
    height: heightInput.value,
    weightGoal: weightGoalInput.value,
    weeklyGoal: weeklyGoalInput.value,
  };

  try {
    const response = await axios.post(endpoint, weightData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    weights.value.push(new Weight(
        response.data.id,
        new Date(response.data.dateRecorded),
        response.data.weight,
        response.data.height,
        response.data.weightGoal,
        response.data.weeklyGoal
    ));
    weightInput.value = 0;
    heightInput.value = 0;
    weightGoalInput.value = 0;
    weeklyGoalInput.value = 0;
    updateChart();
  } catch (error) {
    console.error('Fehler beim Speichern des Gewichts:', error);
  }
}

// Funktion zum Löschen eines Gewichtseintrags
async function deleteWeight(id: number) {
  try {
    await axios.delete(`${endpoint}/${id}`);
    weights.value = weights.value.filter(w => w.id !== id);
    updateChart();
  } catch (error) {
    console.error('Fehler beim Löschen des Gewichts:', error);
  }
}

// Funktion zum Aktualisieren des Diagramms
function updateChart() {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext('2d');
    if (ctx) {
      if (chart) {
        chart.destroy();
      }
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: weights.value.map(w => formatDate(w.dateRecorded)),
          datasets: [{
            label: 'Gewicht (kg)',
            data: weights.value.map(w => w.weight),
            borderColor: '#4CAF50',
            borderWidth: 2,
            pointBackgroundColor: '#4CAF50',
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

onMounted(async () => {
  await fetchWeights();
});
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  font-family: 'Open Sans', sans-serif;
  color: #333;
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.form-container {
  margin-top: 20px;
}

.form-container label {
  margin-top: 10px;
  display: block;
  color: #333;
}

.form-container input {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-save {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.btn-save:hover {
  background-color: #45a049;
}

.btn-delete {
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

.btn-delete:hover {
  background-color: #e53935;
}

.list-container {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  border: 1px solid #ddd;
  padding: 8px;
}

table th {
  background-color: #4CAF50;
  text-align: left;
  color: #fff;
}

button {
  cursor: pointer;
}

.chart {
  margin-top: 20px;
}
</style>
