const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

const carsRouter = require('../cars/cars-router.js');

const server = express();

server.use(helmet());
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use('/api/cars', carsRouter);

server.get('/', (req,res) => {
    res.send(`
    <h2>Sprint Challenge API</h2>
    <p>Welcome to Ali's the KNEX project</p>`);
});

module.exports = server;