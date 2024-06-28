import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import HeartRateView from '@/views/HeartRateView.vue';
import SleepPatternView from '@/views/SleepPatternView.vue';
import BloodPressureView from '@/views/BloodPressureView.vue';
import BloodSugarView from '@/views/BloodSugarView.vue';
import StepCountView from '@/views/StepCountView.vue';
import WeightView from '@/views/WeightView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/heartrate',
      name: 'heartrate',
      component: HeartRateView
    },
    {
      path: '/sleeppattern',
      name: 'sleeppattern',
      component: SleepPatternView
    },
    {
      path: '/bloodpressure',
      name: 'bloodpressure',
      component: BloodPressureView
    },
    {
      path: '/bloodsugar',
      name: 'bloodsugar',
      component: BloodSugarView
    },
    {
      path: '/stepcount',
      name: 'stepcount',
      component: StepCountView
    },
    {
      path: '/weight',
      name: 'weight',
      component: WeightView
    },
  ]
});

export default router;
