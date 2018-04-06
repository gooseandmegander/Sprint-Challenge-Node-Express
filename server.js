// express
const express = require('express');
const server = express();

// require middleware
const morgan = require('morgan');
const helmet = require('helmet');

// routes
const projectsRoutes = require('./Projects/ProjectsRoutes.js');
const actionsRoutes = require('./ActionsRoutes/ActionsRoutes.js');

// middleware
server.use(morgan('dev')); // logger
server.use(helmet()); // security
server.use(express.json()); // parser

server.use('/api/projects', projectsRoutes);
server.use('/api/actions', actionsRoutes);

const port = 5000;
server.listen(port, () => console.log('API running on port 5000...'));
