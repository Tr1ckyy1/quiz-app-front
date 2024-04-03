<template>
  <header class="p-4 border-b sticky top-0 w-full bg-white z-50 sm:px-24 sm:py-6">
    <MenuFunctionality
      @close="closeMenuModal"
      :menuModalOpen="menuModalOpen"
      :userLoggedIn="userLoggedIn"
      @logUserOut="logout"
    />
    <nav class="flex justify-between items-center h-8 sm:h-12">
      <div class="flex items-center gap-20">
        <div class="sm:hidden">
          <RouterLink v-if="!inputFocused" to="/" @click="scrollToTop">
            <QuizIcon />
          </RouterLink>
        </div>
        <div class="hidden sm:block">
          <RouterLink to="/" @click="scrollToTop">
            <QuizIcon />
          </RouterLink>
        </div>

        <RouterLink class="hidden sm:flex sm:items-center sm:gap-2" to="/quizzes">
          <div v-if="activeQuizPage" class="w-3 h-3 bg-blue-main rounded-full"></div>
          <h1>Quizzes</h1>
        </RouterLink>
      </div>

      <div class="flex items-center gap-8" :class="{ 'w-full  sm:w-fit': inputFocused }">
        <div v-if="!isHomePage" class="flex items-center relative" :class="focusedInputWidth">
          <input
            id="search"
            type="text"
            class="peer outline-none px-8 focus:px-10 group focus:ring-1 focus:ring-[#D0D5DD] w-full rounded-lg focus:bg-[#F9FAFB] py-2"
            placeholder="Search"
            @focus="focusInput"
            @blur="blurInput"
            v-model.trim="search"
          />
          <label for="search" class="absolute top-1/2 left-2 peer-focus:left-4 -translate-y-1/2">
            <SearchIcon />
          </label>
          <div
            @mousedown="cancelInput"
            v-if="inputFocused"
            class="absolute right-0 border-l border-[#D0D5DD] h-full flex items-center justify-center px-2.5 cursor-pointer"
          >
            <CancelIcon />
          </div>
        </div>
        <div @click="openMenuModal" class="sm:hidden" v-if="!inputFocused">
          <BurgerMenuIcon />
        </div>

        <div
          @click="openCredentials"
          v-if="userLoggedIn"
          class="hidden sm:flex w-8 h-8 rounded-full border items-center justify-center cursor-pointer shrink-0 relative"
        >
          <Avatar />
          <Transition
            enter-active-class="duration-100 ease-in-out"
            leave-active-class="duration-100 ease-in-out"
            enter-from-class="scale-75"
            leave-to-class="scale-75"
          >
            <div
              v-if="credentialsOpen"
              class="absolute border cursor-default border-[#D0D5DD] bg-white right-0 top-0 rounded-lg z-50 shadow-md p-8 space-y-5"
            >
              <div class="w-10 h-10 bg-gray-500 rounded-full shrink-0"></div>
              <div>
                <h1 class="font-bold">Omar Jangavadze</h1>
                <div class="flex gap-20 items-center justify-between">
                  <p>omar.jangavadze11@gmail.com</p>

                  <button
                    @click.stop="logout"
                    class="group duration-300 hover:bg-black/10 rounded-full w-8 h-8 flex items-center justify-center ease-linear"
                  >
                    <LogoutIcon class="group-hover:scale-75 duration-300 ease-linear" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
        <div v-else class="hidden sm:flex items-center gap-10">
          <BaseButton link to="/auth/signup" mode="signup">Sign up</BaseButton>
          <BaseButton link to="/auth/login" mode="login">Log in</BaseButton>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import QuizIcon from '@/icons/QuizIcon.vue'
import BurgerMenuIcon from '@/icons/BurgerMenuIcon.vue'
import SearchIcon from '@/icons/SearchIcon.vue'
import CancelIcon from '@/icons/CancelIcon.vue'
import LogoutIcon from '@/icons/LogoutIcon.vue'
import Avatar from '@/icons/Avatar.vue'
import MenuFunctionality from './MenuFunctionality.vue'
import { logout as logoutApi } from '@/services/api/auth'

export default {
  props: ['isHomePage'],
  components: {
    QuizIcon,
    BurgerMenuIcon,
    SearchIcon,
    CancelIcon,
    LogoutIcon,
    Avatar,
    MenuFunctionality
  },
  data() {
    return {
      inputFocused: false,
      menuModalOpen: false,
      credentialsOpen: false,
      search: ''
    }
  },

  computed: {
    focusedInputWidth() {
      return this.inputFocused ? 'w-full duration-150 transition-all sm:w-96' : 'w-32'
    },
    activeQuizPage() {
      return this.$route.name === 'quizzes'
    },
    userLoggedIn() {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    async logout() {
      await logoutApi()
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    },
    openCredentials() {
      if (!this.credentialsOpen) this.credentialsOpen = true
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    focusInput() {
      this.inputFocused = true
    },
    blurInput() {
      this.inputFocused = false
    },
    cancelInput() {
      this.search = ''
      this.blurInput()
    },
    openMenuModal() {
      this.menuModalOpen = true
    },
    closeMenuModal() {
      this.menuModalOpen = false
    }
  }
}
</script>
