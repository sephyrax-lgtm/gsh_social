<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-800 to-blue-900 text-white">
    <!-- Background animé -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,150,0.2),_transparent)] animate-pulse-slow pointer-events-none"></div>

    <!-- Navigation -->
    <header class="relative z-20 shadow-2xl bg-black/30 backdrop-blur-2xl border-b border-gray-700">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <!-- Logo -->
        <div class="flex items-center gap-4">
          <img 
            src="https://img.icons8.com/color/96/000000/conference-call.png" 
            alt="GSH Social Logo" 
            class="h-12 w-12 animate-spin-slow hover:scale-125 transition-transform duration-700 drop-shadow-neon"
          />
          <span class="text-4xl font-extrabold tracking-wide text-orange-400 drop-shadow-neon animate-pulse">GSH Social</span>
        </div>

        <!-- Navigation -->
        <nav class="flex items-center gap-10 text-lg font-semibold">
          <router-link
            to="/"
            class="relative group px-2 py-1 transition-all hover:text-orange-400 drop-shadow-neon"
          >
            Accueil
            <span class="absolute left-0 -bottom-1 w-0 h-1 bg-orange-500 group-hover:w-full transition-all rounded-full"></span>
          </router-link>
          <router-link
            to="/login"
            class="relative group px-2 py-1 transition-all hover:text-orange-400 drop-shadow-neon"
          >
            Connexion
            <span class="absolute left-0 -bottom-1 w-0 h-1 bg-orange-500 group-hover:w-full transition-all rounded-full"></span>
          </router-link>
          <router-link
            to="/register"
            class="relative group px-2 py-1 transition-all hover:text-orange-400 drop-shadow-neon"
          >
            Inscription
            <span class="absolute left-0 -bottom-1 w-0 h-1 bg-orange-500 group-hover:w-full transition-all rounded-full"></span>
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Contenu des routes -->
    <main class="relative z-20 mx-auto max-w-7xl px-6 py-12">
      <router-view 
        class="bg-black/40 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-700 hover:shadow-orange-500/70 transition-all duration-500"
      />
    </main>
  </div>
</template>

<script setup>
// Rien à ajouter ici
</script>

<style scoped>
/* Glow néon pour texte et logo */
.drop-shadow-neon {
  text-shadow: 0 0 8px #fb923c, 0 0 16px #f97316, 0 0 24px #f59e0b;
}

/* Animation background slow pulse */
@keyframes pulse-slow {
  0%, 100% { transform: scale(1) translate(-50%, -50%) rotate(0deg); opacity: 0.3; }
  50% { transform: scale(1.2) translate(-50%, -50%) rotate(45deg); opacity: 0.5; }
}
.animate-pulse-slow {
  animation: pulse-slow 15s infinite ease-in-out;
}

/* Animation rotation lente pour le logo */
@keyframes spin-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
</style>
