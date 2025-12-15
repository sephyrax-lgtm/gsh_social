<template>
  <div class="relative flex h-screen w-full">
    <!-- Partie gauche -->
    <div class="flex w-1/2 items-center justify-center bg-black text-white">
      <div class="w-2/3 xl:w-1/2">
        <div class="mb-6 text-center">
          <p class="text-3xl font-bold">GSH Social</p>
          <p class="text-gray-300">Créez votre compte pour commencer</p>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="registerUser" class="space-y-6">
          <div>
            <label class="mb-2 block font-semibold">Nom complet</label>
            <input v-model="name" type="text" placeholder="Votre nom"
              class="w-full rounded-full bg-white p-3 text-black shadow focus:ring-2 focus:ring-orange-500"
              required />
          </div>

          <div>
            <label class="mb-2 block font-semibold">Adresse email</label>
            <input v-model="email" type="email" placeholder="exemple@utilisateur.com"
              class="w-full rounded-full bg-white p-3 text-black shadow focus:ring-2 focus:ring-orange-500"
              required />
          </div>

          <div>
            <label class="mb-2 block font-semibold">Mot de passe</label>
            <input v-model="password" type="password" placeholder="********"
              class="w-full rounded-full bg-white p-3 text-black shadow focus:ring-2 focus:ring-orange-500"
              required />
          </div>

          <div>
            <label class="mb-2 block font-semibold">Confirmer le mot de passe</label>
            <input v-model="confirmPassword" type="password" placeholder="********"
              class="w-full rounded-full bg-white p-3 text-black shadow focus:ring-2 focus:ring-orange-500"
              required />
          </div>

          <button type="submit"
            class="w-full rounded-full bg-orange-600 py-3 text-white font-semibold hover:bg-orange-800 transition">
            S'inscrire
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
      <img src="https://images.pexels.com/photos/2523959/pexels-photo-2523959.jpeg"
        class="h-full w-full object-cover" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const message = ref("");
const messageColor = ref("text-green-400");

const registerUser = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (password.value !== confirmPassword.value) {
    message.value = "❌ Les mots de passe ne correspondent pas.";
    messageColor.value = "text-red-400";
    return;
  }

  const userExists = users.find((u) => u.email === email.value);
  if (userExists) {
    message.value = "⚠️ Cet email est déjà utilisé.";
    messageColor.value = "text-red-400";
    return;
  }

  const newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  message.value = `✅ Inscription réussie ! Bienvenue ${name.value}.`;
  messageColor.value = "text-green-400";

  name.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
};
</script>
