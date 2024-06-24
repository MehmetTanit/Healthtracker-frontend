import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Persons from "@/views/UsersView.vue";
import HeartRateView from "@/views/HeartRateView.vue";
import UsersView from "@/views/UsersView.vue";
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
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
      path: '/users',
      name: 'Users',
      component: UsersView
    }

  ]
})

export default router
