
const http = require('http');
//  from app.js
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);