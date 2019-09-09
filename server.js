const express = require('express');
const helmet = require('helmet');

console.log("ENVIRONMENT", process.env.NODE_ENV);

const projectsRouter = require('./data/routes/projectsRouter.js');
const actionsRouter = require('./data/routes/actionsRouter.js');

const server = express();

server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Web API Sprint Challenge</h2>`)
});

module.exports = server;