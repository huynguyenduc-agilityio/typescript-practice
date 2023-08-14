const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/server/index.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3000;

server.use(middlewares);

// Custom middleware to add CORS headers
server.use((req, res, next) => {
    // Allow requests from any origin for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Specify the allowed HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // Specify the allowed headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Allow credentials (if needed)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/authentication': '/authentication', // Define the custom route for /authentication
    '/cart': '/cart', // Define the custom route for /cart
}));

server.use(router);

server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});

// Export the Server API
module.exports = server;