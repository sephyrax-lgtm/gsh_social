<template>
  <div class="relative flex h-screen w-full">
    <!-- Partie gauche -->
    <div class="flex w-1/2 items-center justify-center bg-black text-white">
      <div class="w-2/3 xl:w-1/2">
        <!-- Titre -->
        <div class="mb-6 text-center">
          <p class="text-3xl font-bold">GSH Social</p>
          <p class="text-gray-300">Veuillez vous connecter pour continuer</p>
        </div>

        <!-- Bouton Google -->
        <button
          class="flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-black shadow hover:bg-gray-200 mb-6"
        >
          <img src="https://freesvg.org/img/1534129544.png" class="w-6" />
          <span>Se connecter avec Google</span>
        </button>

        <!-- Séparateur -->
        <div class="my-6">
          <fieldset class="border-t border-gray-600">
            <legend class="mx-auto px-2 text-sm text-gray-400">
              Ou utilisez notre système sécurisé
            </legend>
          </fieldset>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="loginUser" class="space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="mb-2 block font-semibold">Adresse email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="exemple@utilisateur.com"
              class="w-full rounded-full bg-white p-3 text-black shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="mb-2 block font-semibold">Mot de passe</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="********"
              class="w-full rounded-full bg-white p-3 text-black shadow placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <!-- Options -->
          <div class="flex flex-col justify-between sm:flex-row sm:items-center">
            <label class="flex items-center text-sm">
              <input type="checkbox" v-model="seSouvenir" class="mr-2" />
              Se souvenir de moi
            </label>
            <a href="#" class="text-sm text-gray-400 hover:text-gray-200">Mot de passe oublié ?</a>
          </div>

          <!-- Bouton connexion -->
          <button
            type="submit"
            class="w-full rounded-full bg-orange-600 py-3 text-white font-semibold hover:bg-orange-800 transition"
          >
            Se connecter
          </button>
        </form>

        <!-- Message -->
        <div v-if="message" class="mt-6 text-center text-lg" :class="messageColor">
          {{ message }}
        </div>
      </div>
    </div>

    <!-- Partie droite (image) -->
    <div class="hidden w-1/2 md:block">
      <img
        src="https://images.pexels.com/photos/2523959/pexels-photo-2523959.jpeg"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const seSouvenir = ref(false)
const message = ref('')
const messageColor = ref('text-green-400')
const router = useRouter()

const loginUser = () => {
  const users = JSON.parse(localStorage.getItem('users')) || []

  const user = users.find(
    (u) => u.email === email.value && u.password === password.value
  )

  if (user) {
    // Sauvegarde de la session
    localStorage.setItem('currentUser', JSON.stringify(user))
    message.value = `✅ Bienvenue ${user.name} !`
    messageColor.value = 'text-green-400'

    // Redirection vers Dashboard
    setTimeout(() => {
      router.push('/dashboard')
    }, 800)
  } else {
    message.value = '❌ Email ou mot de passe incorrect.'
    messageColor.value = 'text-red-400'
  }
}
</script>
