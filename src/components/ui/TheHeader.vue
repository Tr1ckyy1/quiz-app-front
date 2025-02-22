<template>
  <header class="p-4 border-b top-0 w-full sticky bg-white z-[300] sm:px-24 sm:py-6">
    <ToastMessage :toast="toast" />

    <BurgerMenuFunctionality
      @close="closeMenuModal"
      :menuModalOpen="menuModalOpen"
      :userLoggedIn="userLoggedIn"
      @logUserOut="logout"
      :userCredentials="userCredentials"
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

        <RouterLink
          @click="removeAllQueriesFromUrl"
          class="hidden sm:flex sm:items-center sm:gap-2"
          to="/quizzes"
        >
          <h1
            :class="{
              'before:w-2 before:h-2 before:absolute before:bg-blue-main before:rounded-full before:top-1/2 before:-translate-y-1/2 before:right-full before:mr-2':
                $route.path.includes('quizzes')
            }"
            class="relative"
          >
            Quizzes
          </h1>
        </RouterLink>
      </div>

      <div class="flex items-center gap-8" :class="{ 'w-full  sm:w-fit': inputFocused }">
        <div v-if="activeQuizPage" class="flex items-center relative" :class="focusedInputWidth">
          <input
            id="search"
            type="text"
            class="peer outline-none px-8 focus:px-10 focus:ring-1 focus:ring-[#D0D5DD] w-full rounded-lg focus:bg-[#F9FAFB] py-2"
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
        <div @click="openMenuModal" class="cursor-pointer sm:hidden" v-if="!inputFocused">
          <BurgerMenuIcon />
        </div>

        <div
          @click.stop="openCredentialsModal"
          v-if="userLoggedIn"
          class="hidden sm:flex w-8 h-8 rounded-full border items-center justify-center cursor-pointer shrink-0 relative"
        >
          <div v-if="!userDataLoading && userCredentials?.profile_image" class="shrink-0 h-10 w-10">
            <img
              :src="userCredentials?.profile_image"
              class="rounded-full w-full h-full object-cover"
            />
          </div>
          <Avatar v-else-if="!userDataLoading && !userCredentials?.profile_image" />

          <Transition
            enter-active-class="duration-100 ease-in-out"
            leave-active-class="duration-100 ease-in-out"
            enter-from-class="scale-75"
            leave-to-class="scale-75"
          >
            <div
              v-if="credentialsModalOpen"
              class="absolute border cursor-default border-[#D0D5DD] bg-white right-0 top-0 rounded-lg shadow-md p-8 space-y-5"
              ref="credentialsModal"
            >
              <img
                v-if="userCredentials?.profile_image"
                :src="userCredentials?.profile_image"
                class="rounded-full h-12 w-12 object-cover shrink-0 border-dotted border"
              />
              <div>
                <h1 class="font-bold">{{ userCredentials?.username }}</h1>
                <div class="flex gap-20 items-center justify-between">
                  <p>{{ userCredentials?.email }}</p>

                  <button
                    v-if="userLoggedIn"
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
import BurgerMenuFunctionality from './BurgerMenuFunctionality.vue'
import { logout as logoutApi } from '@/services/api/auth'
import { getUser as getUserApi } from '@/services/api/user'

export default {
  components: {
    QuizIcon,
    BurgerMenuIcon,
    SearchIcon,
    CancelIcon,
    LogoutIcon,
    Avatar,
    BurgerMenuFunctionality
  },
  data() {
    return {
      inputFocused: false,
      menuModalOpen: false,
      credentialsModalOpen: false,
      search: '',
      userCredentials: null,
      debounceTimer: null,
      userDataLoading: false
    }
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue !== oldValue) {
        clearTimeout(this.debounceTimer)
        this.debounceTimer = setTimeout(() => {
          this.$router.replace({
            query: {
              ...this.$route.query,
              search: this.search
            }
          })
        }, 500)
      }
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
    },
    toast() {
      return this.$store.getters['toast/toastValues']
    }
  },
  methods: {
    removeAllQueriesFromUrl() {
      if (this.activeQuizPage) {
        this.$store.dispatch('filter/setAllCategories', [])
        this.$store.dispatch('filter/setAllLevels', [])
        this.$store.dispatch('filter/setSort', '')
      }
    },
    async getUser() {
      this.userDataLoading = true
      try {
        const {
          data: {
            data: { email, username, profile_image }
          }
        } = await getUserApi()

        this.userCredentials = {
          email,
          username,
          profile_image
        }
      } catch (err) {
        if (err?.response?.status === 401) {
          if (this.userLoggedIn) {
            this.$store.dispatch('auth/logout')
          }
          if (localStorage.getItem('loggedIn')) localStorage.removeItem('loggedIn')
        }
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          text:
            err?.response?.status === 401
              ? `${err?.response?.status} ${err?.response?.data?.message}`
              : 'Unexpected Error',
          message:
            err?.response?.status === 401
              ? `Your authentication token may have expired. Please try logging in again.`
              : err.message,
          duration: 5000
        })
      } finally {
        this.userDataLoading = false
      }
    },
    async logout() {
      this.credentialsModalOpen = false

      try {
        await logoutApi()

        this.$store.dispatch('auth/logout')
        this.$router.push('/auth/login')
      } catch (err) {
        this.$store.dispatch('toast/setToast', {
          type: 'error',
          text: err.response?.status === 401 ? 'Unauthorized' : 'Unexpected Error',
          message: err.message,
          duration: 5000
        })
      }
    },
    openCredentialsModal() {
      if (!this.credentialsModalOpen) this.credentialsModalOpen = true
    },
    handleClickOutside(e) {
      if (this.$refs.credentialsModal && !this.$refs.credentialsModal?.contains(e.target)) {
        this.credentialsModalOpen = false
      }
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
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside)

    if (localStorage.getItem('loggedIn') && this.$store.getters['auth/isAuthenticated'])
      this.getUser()
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  }
}
</script>
