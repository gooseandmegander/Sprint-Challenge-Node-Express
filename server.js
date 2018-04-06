// express
const express = require('express');
const server = express();

// routes

// middleware
server.use(express.json());

const port = 5000;
server.listen(port, () => console.log('API running on port 5000...'));
