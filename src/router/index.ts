import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HeartRateView from "@/views/HeartRateView.vue";
import SleepPatternView from "@/views/SleepPatternView.vue";

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
  ]
})

export default router
