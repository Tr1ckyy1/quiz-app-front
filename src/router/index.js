import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Quizzes from '@/views/Quizzes.vue'
import Quiz from '@/views/Quiz.vue'
import Authorization from '@/views/Authorization.vue'
import Signup from '@/components/auth/Signup.vue'
import Login from '@/components/auth/Login.vue'
import Forgot from '@/components/auth/Forgot.vue'
import Reset from '@/components/auth/Reset.vue'
import TheHeader from '@/components/ui/TheHeader.vue'
import TheFooter from '@/components/ui/TheFooter.vue'
import store from '@/store/index'

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

      children: [
        {
          path: '',
          name: 'quizzes',
          components: {
            header: TheHeader,
            default: Quizzes,
            footer: TheFooter
          }
        },
        {
          path: '/quizzes/:quizId',
          props: true,
          name: 'showQuiz',
          components: {
            header: TheHeader,
            default: Quiz,
            footer: TheFooter
          }
        }
      ]
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
        },
        {
          path: 'reset',
          component: Reset
        }
      ],
      meta: { requiresUnAuth: true }
    }
  ],
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { left: 0, top: 0 }
  }
})
router.beforeEach(function (to, _, next) {
  const authenticated = store.getters['auth/isAuthenticated']
  if (to.meta.requiresAuth && !authenticated) {
    next('/auth/login')
  } else if (to.meta.requiresUnAuth && authenticated) next('/quizzes')
  else next()
})

export default router
