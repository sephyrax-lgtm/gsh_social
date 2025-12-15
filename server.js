// server.js
import jsonServer from 'json-server'
import auth from 'json-server-auth'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Configuration des règles d’accès
// Exemple : seul l’utilisateur connecté peut modifier ses posts
const rules = auth.rewriter({
  users: 600,     // lecture/écriture réservée à l’utilisateur connecté
  posts: 640,     // lecture publique, écriture protégée
})

server.db = router.db
server.use(middlewares)
server.use(rules)
server.use(auth)
server.use(router)

server.listen(3000, () => {
  console.log('✅ JSON Server Auth running on http://localhost:3000')
})
