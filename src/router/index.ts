/*
 * @Description:
 * @Author: ldx
 * @Date: 2024-12-09 10:02:04
 * @LastEditors: ldx
 * @LastEditTime: 2024-12-30 09:54:47
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

  ],
})

export default router
