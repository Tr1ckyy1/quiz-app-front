import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Quizzes from '@/views/Quizzes.vue'
import Authorization from '@/views/Authorization.vue'
import Signup from '@/components/auth/Signup.vue'
import Login from '@/components/auth/Login.vue'
import Forgot from '@/components/auth/Forgot.vue'
import TheHeader from '@/components/ui/TheHeader.vue'
import TheFooter from '@/components/ui/TheFooter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        header: TheHeader,
        footer: TheFooter
      }
    },
    {
      path: '/quizzes',
      name: 'quizzes',
      components: {
        header: TheHeader,
        default: Quizzes,
        footer: TheFooter
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Authorization,
      children: [
        {
          path: 'signup',
          component: Signup
        },
        {
          path: 'login',
          component: Login
        },
        {
          path: 'forgot',
          component: Forgot
        }
      ]
    }
    //   {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (About.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import('../views/AboutView.vue')
    //   }
  ],
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  }
})

export default router
