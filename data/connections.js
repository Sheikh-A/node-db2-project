const knex = require('knex');

const knexfile = require('../knexfile.js');

// const environment = process.env.NODE_ENV || "development";

const knexConfig = knexfile.development;
// const knexConfig = knexfile[environment];

// db represents a live connection to the db
module.exports = knex(knexConfig);