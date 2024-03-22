import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Quizzes from '@/views/Quizzes.vue'
import Authorization from '@/views/Authorization.vue'
// import Registration from '@/components/auth/SignupModal.vue'
// import Login from '@/components/auth/LoginModal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quizzes',
      name: 'quizzes',
      component: Quizzes
    },
    // {
    //   path: '/auth',
    //   name: 'auth',
    //   component: Authorization,
    //   children: [
    //     {
    //       path: 'signup',
    //       component: Registration
    //     },
    //     {
    //       path: 'login',
    //       component: Login
    //     }
    //   ]
    // }

    //   {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue')
    //   }
  ]
})

export default router
