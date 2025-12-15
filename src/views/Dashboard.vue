<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-950 text-white">
    <header class="flex justify-between items-center px-8 py-6 bg-black/40 backdrop-blur-xl shadow-2xl border-b border-gray-700">
      <h1 class="text-4xl font-extrabold text-orange-500 tracking-wide animate-pulse">GSH Social</h1>
      <button @click="logout" class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-bold uppercase shadow-lg transform hover:scale-105 transition-all">Déconnexion</button>
    </header>

    <main class="max-w-3xl mx-auto py-12 px-6">
      <div class="bg-black/40 backdrop-blur-md p-6 rounded-3xl shadow-2xl mb-10 border border-gray-700">
        <textarea v-model="newPost" placeholder="Exprimez-vous..." class="w-full p-5 rounded-2xl bg-black/50 text-white placeholder-gray-400 focus:ring-4 focus:ring-orange-500 outline-none resize-none shadow-inner transition-all" rows="4"></textarea>

        <button class="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 px-6 py-3 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all" @click="createPost">Publier 📨</button>

        <div class="mt-3">
          <button @click="triggerFileSelect" class="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 px-6 py-3 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all">Ajouter une image</button>
          <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileSelect" />
          <div v-if="selectedImage" class="mt-3 flex justify-center">
            <img :src="selectedImage" class="w-32 h-32 rounded-xl object-cover border-2 border-orange-500 shadow-lg" />
          </div>
        </div>
      </div>

      <transition-group name="fade">
        <div v-for="post in store.posts" :key="post.id" class="bg-black/30 backdrop-blur-md p-6 rounded-3xl mb-8 shadow-2xl border border-gray-700 hover:shadow-orange-500/50 hover:bg-black/50 transition-all duration-300">
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center gap-4">
              <img :src="post.avatar" class="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500 shadow-lg" />
              <p class="font-bold text-orange-400 text-lg tracking-wide">{{ post.pseudo }}</p>
            </div>
            <button @click="store.deletePost(post.id)" class="text-red-500 hover:text-red-700 font-semibold text-sm hover:scale-110 transition-transform">Supprimer ✖</button>
          </div>

          <p class="text-gray-200 text-lg mb-4">{{ post.content }}</p>

          <div v-if="post.image" class="flex justify-center mb-4">
            <img :src="post.image" class="max-h-80 w-full object-cover rounded-2xl border-2 border-orange-500 shadow-lg" />
          </div>

          <div class="flex items-center gap-6 text-sm text-gray-300 mb-4">
            <button @click="store.likePost(post)" class="hover:text-orange-400 flex items-center gap-1 transition-all transform hover:scale-110">❤️ {{ post.likes }}</button>
            <button @click="toggleComments(post.id)" class="hover:text-orange-400 flex items-center gap-1 transition-all transform hover:scale-110">💬 {{ post.comments.length }}</button>
          </div>

          <div v-if="openCommentId === post.id" class="mt-3 space-y-3 border-t border-gray-700 pt-3">
            <div v-for="comment in post.comments" :key="comment.id" class="flex items-start gap-3 bg-gray-900/30 p-3 rounded-2xl shadow-inner">
              <span class="text-orange-400 font-bold">💬</span>
              <p class="text-gray-200"><span class="text-orange-400 font-semibold">{{ comment.pseudo }}</span> : {{ comment.text }}</p>
            </div>

            <div class="flex mt-3 gap-2">
              <input v-model="newComment" placeholder="Votre commentaire..." class="flex-1 p-3 rounded-l-2xl bg-black/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 outline-none transition-all shadow-inner" />
              <button @click="commentPost(post.id)" class="rounded-r-2xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 px-5 font-bold transition-transform transform hover:scale-105">Envoyer</button>
            </div>
          </div>
        </div>
      </transition-group>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { usePostsStore } from "../stores/posts"

const avatarBase = "/src/assets/avatars/"
const postsBase = "/src/assets/posts/"

const fakeUsers = [
  { pseudo: "LunaDream", avatar: avatarBase + "luna.jpg" },
  { pseudo: "TechWolf", avatar: avatarBase + "wolf.jpg" },
  { pseudo: "Maya_Art", avatar: avatarBase + "maya.jpg" },
  { pseudo: "NeoFusion", avatar: avatarBase + "neo.jpg" },
  { pseudo: "Skyler", avatar: avatarBase + "skyler.jpg" },
  { pseudo: "AstralKid", avatar: avatarBase + "astral.jpg" }
]

const fakeTexts = [
  "Quelle journée incroyable 🌅!",
  "Quelqu’un veut jouer en ligne 🎮?",
  "Regardez ce que j’ai trouvé 😍",
  "Je reviens de la salle ! 💪🔥",
  "Un café et c'est reparti ☕",
  "La vie est belle ✨",
  "Nouvelle création graphique 🎨",
  "Hâte d’être en week-end 😴"
]

const randomImages = [
  postsBase + "pic1.jpg",
  postsBase + "pic2.jpg",
  postsBase + "pic3.jpg",
  postsBase + "pic4.jpg",
  postsBase + "pic5.jpg"
]

const getRandomUser = () => fakeUsers[Math.floor(Math.random() * fakeUsers.length)]
const getRandomImage = () => randomImages[Math.floor(Math.random() * randomImages.length)]

const store = usePostsStore()
const router = useRouter()

const newPost = ref("")
const newComment = ref("")
const openCommentId = ref(null)
const selectedImage = ref(null)
const fileInput = ref(null)

const followed = ref(new Set(JSON.parse(localStorage.getItem("followedUsers") || "[]")))

const saveFollowed = () => localStorage.setItem("followedUsers", JSON.stringify([...followed.value]))
const isFollowing = (pseudo) => followed.value.has(pseudo)
const toggleFollow = (u) => { if (!u || !u.pseudo) return; followed.value.has(u.pseudo) ? followed.value.delete(u.pseudo) : followed.value.add(u.pseudo); saveFollowed() }
const toggleFollowByPseudo = (pseudo) => { if (!pseudo) return; followed.value.has(pseudo) ? followed.value.delete(pseudo) : followed.value.add(pseudo); saveFollowed() }

onMounted(() => {
  store.fetchPosts()
  if (store.posts.length === 0) generateFakePosts()
})

const generateFakePosts = () => {
  for (let i = 0; i < 8; i++) {
    const user = getRandomUser()
    const content = fakeTexts[Math.floor(Math.random() * fakeTexts.length)]

    store.addPost({
      id: Date.now() + i,
      pseudo: user.pseudo,
      avatar: user.avatar,
      content,
      image: Math.random() > 0.5 ? getRandomImage() : null,
      likes: Math.floor(Math.random() * 300),
      comments: []
    })
  }
}

const triggerFileSelect = () => fileInput.value.click()
const handleFileSelect = (e) => { const f = e.target.files[0]; if (f) selectedImage.value = URL.createObjectURL(f) }

const createPost = async () => {
  if (!newPost.value.trim()) return

  const user = getRandomUser()

  await store.addPost({
    id: Date.now(),
    pseudo: user.pseudo,
    avatar: user.avatar,
    content: newPost.value,
    image: selectedImage.value,
    likes: 0,
    comments: []
  })

  newPost.value = ""
  selectedImage.value = null
  fileInput.value.value = null
}

const toggleComments = (id) => openCommentId.value = openCommentId.value === id ? null : id

const commentPost = async (postId) => {
  if (!newComment.value.trim()) return

  await store.addComment(postId, {
    id: Date.now(),
    pseudo: "Visiteur", 
    
    text: newComment.value
  })

  newComment.value = ""
}

const logout = () => { localStorage.removeItem("user") }
</script>

