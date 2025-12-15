// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    login(user) {
      this.currentUser = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.currentUser = null
      localStorage.removeItem('user')
    }
  }
})
