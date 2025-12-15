import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // state
  const user = ref(null)

  // getters
  const isLoggedIn = computed(() => user.value !== null)
  const username = computed(() => user.value ? user.value.name : 'Invité')

  // actions
  function login(name) {
    user.value = { name }  // ici tu peux ajouter d'autres infos comme email, id...
  }

  function logout() {
    user.value = null
  }

  return { user, isLoggedIn, username, login, logout }
})
