const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('src/server/index.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}))
server.use(router)

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server