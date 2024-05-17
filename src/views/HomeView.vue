<template>
  <main>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1>Willkommen zu Ihrem Gesundheitstracker</h1>
        <p>Verfolgen und verwalten Sie Ihre wichtigsten Gesundheitsdaten mühelos.</p>
        <a href="#" class="btn btn-primary btn-lg">Erfahren Sie mehr</a>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-md-4" v-for="(feature, index) in features" :key="index">
            <div class="mb-4">
              <i :class="`feature-icon bi bi-${feature.icon}`"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Gesundheitstracker. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const features = ref([
  {
    icon: 'heart',
    title: 'Herzfrequenz',
    description: 'Überwachen Sie Ihre Herzfrequenz und erhalten Sie wertvolle Einblicke in Ihre kardiovaskuläre Gesundheit.'
  },
  {
    icon: 'speedometer',
    title: 'Blutdruck',
    description: 'Verfolgen Sie Ihren Blutdruck, um Ihre Herzgesundheit im Auge zu behalten.'
  },
  {
    icon: 'person-lines-fill',
    title: 'Gewicht',
    description: 'Überprüfen Sie Ihre Gewichtsveränderungen und setzen Sie sich gesundheitsbewusste Ziele.'
  },
  {
    icon: 'bicycle',
    title: 'Schrittzähler',
    description: 'Verfolgen Sie Ihre täglichen Schritte und bleiben Sie aktiv.'
  },
  {
    icon: 'moon',
    title: 'Schlafmuster',
    description: 'Analysieren Sie Ihre Schlafgewohnheiten und verbessern Sie Ihre Schlafqualität.'
  },
  {
    icon: 'droplet-half',
    title: 'Blutzuckerspiegel',
    description: 'Behalten Sie Ihren Blutzuckerspiegel im Auge und verwalten Sie Ihre Diabetes.'
  }
]);
</script>

<style scoped>
.hero-section {
  background: url('https://source.unsplash.com/1600x900/?health,fitness') no-repeat center center;
  background-size: cover;
  color: white;
  padding: 100px 0;
  text-align: center;
}

.feature-icon {
  font-size: 2.5rem;
  color: #007bff;
}

.footer {
  background-color: #f8f9fa;
  padding: 20px 0;
  text-align: center;
}
</style>
