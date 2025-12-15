<template>
  <div class="h-screen w-full flex flex-col md:flex-row bg-gray-50">
    <!-- Partie gauche : Présentation -->
    <div class="flex flex-col justify-center items-start w-full md:w-1/2 p-12 space-y-8">
      <!-- Logo -->
      <img src="../Capture d'écran 2025-10-02 115217.png" alt="Logo GSH Social" />




      <!-- Titre -->
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900">
        Bienvenue sur GSH Social !!
      </h1>

      <!-- Slogan -->
      <p class="text-lg md:text-xl text-gray-700">
        Connectez-vous, partagez et découvrez avec une plateforme simple et sécurisée.
      </p>

      <!-- Bouton inscription -->
      <router-link
        to="/register"
        class="mt-4 inline-block rounded-full bg-orange-600 py-3 px-6 text-white font-semibold hover:bg-orange-800 transition"
      >
        Commencer maintenant
      </router-link>
    </div>

    <!-- Partie droite : Image/Illustration -->
    <div class="hidden md:block w-1/2 h-full">
      <img
        src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg"
        alt="Présentation GSH Social"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script setup>
// Pas de logique particulière pour cette page
</script>

<style scoped>
/* Tu peux ajouter des animations ou effets si nécessaire */
</style>

