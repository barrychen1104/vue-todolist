import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/todolist',
      component: () => import('../views/TodoListView.vue')
    }
  ]
})

export default router
