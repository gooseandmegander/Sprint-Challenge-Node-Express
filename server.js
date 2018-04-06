// express
const express = require('express');

// server
const server = express();
const { port } = require('./PortConfig.js');

// require middleware
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// routes
const projectsRoutes = require('./Routing/ProjectsRoutes/ProjectsRoutes.js');
const actionsRoutes = require('./Routing/ActionsRoutes/ActionsRoutes.js');

// use middleware
server.use(cors());
server.use(morgan('dev')); // logger
server.use(helmet()); // security
server.use(express.json()); // parser

server.use('/api/projects', projectsRoutes);
server.use('/api/actions', actionsRoutes);

server.listen(port, () => console.log('API running on port 5000...'));
