<template>
  <div>
    <p>Bonjour : {{ username }}</p>
    <button v-if="!isLoggedIn" @click="login('Alice')">Se connecter</button>
    <button v-if="isLoggedIn" @click="logout">Se déconnecter</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()

const login = (name) => auth.login(name)
const logout = () => auth.logout()
const username = auth.username
const isLoggedIn = auth.isLoggedIn
</script>
