// src/stores/posts.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: []
  }),

  actions: {
    // Récupérer tous les posts
    async fetchPosts() {
      try {
        const { data } = await axios.get('http://localhost:3000/posts?_sort=id&_order=desc')
        this.posts = data
      } catch (error) {
        console.error('Erreur fetchPosts:', error)
      }
    },

    // Ajouter un post avec userId, pseudo et avatar
    async addPost(post) {
      try {
        const newPost = {
          ...post,            // contient userId, pseudo, content, avatar
          likes: 0,
          comments: [],
          createdAt: new Date().toISOString()
        }
        await axios.post('http://localhost:3000/posts', newPost)
        this.fetchPosts()
      } catch (error) {
        console.error('Erreur addPost:', error)
      }
    },

    // Supprimer un post
    async deletePost(id) {
      try {
        await axios.delete(`http://localhost:3000/posts/${id}`)
        this.fetchPosts()
      } catch (error) {
        console.error('Erreur deletePost:', error)
      }
    },

    // Ajouter un like
    async likePost(post) {
      try {
        const updated = { ...post, likes: post.likes + 1 }
        await axios.put(`http://localhost:3000/posts/${post.id}`, updated)
        this.fetchPosts()
      } catch (error) {
        console.error('Erreur likePost:', error)
      }
    },

    // Ajouter un commentaire
    async addComment(postId, comment) {
      try {
        const { data: post } = await axios.get(`http://localhost:3000/posts/${postId}`)
        post.comments.push({
          ...comment,   // contient userId, pseudo, text
          id: Date.now()
        })
        await axios.put(`http://localhost:3000/posts/${postId}`, post)
        this.fetchPosts()
      } catch (error) {
        console.error('Erreur addComment:', error)
      }
    }
  }
})
