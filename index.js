require('dotenv').config();// read from a .env file 
//located at the root of the project and merge the key/value pairs
//into process.env

const server = require('./api/server.js');

const port = process.env.PORT || 5000;
server.listen(port, () => { 
    console.log(`\n** Running on port ${port}**\n`);
 });


/*
npx  i knex
npx knex init, npm i sqlite3
add migration to knexfile.js
update db-config.js file, also make sure to fix the connection, even if the DB is not created yet,
you will create the db in next step
add "migrations" to KNEX.js file

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/cars.db3' //THIS WILL BE YOUR TABLES NAME
    },

    useNullAsDefault: true,
    //added this in

    migrations: {
      directory: "./data/migrations"

    }
  },

Now we can create migrations file to create DB
npx knex migrate:make fruits-schema 
should be under data folder
fill in data with the schema

create schema in migrations > TIMESTAMP_schema.js

exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.incremetns('id');
      tbl.string('vin', 128).unique().notNullable();
      tbl.string('make', 128).notNullable();
      tbl.string('model', 128).notNullable();
      tbl.decimal('mileage').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};


npx knex migrate:latest
in order to make change to schema: npx knex migrate:rollback, npm knex migrate:latest
,
creating a new migrate file i.e. COLORS follow steps above
npx knex migrate:make colors-schema 
add column
fix exports down for column
re run npx knex migrate:latest

Add SEEDS TO KNEX.JS FILE same as you did with Migrations
create seeds in knexfile.js -- npm knex seed:make 01-fruits
Exeucted in aplha order, so use numbers
npx knex seed:make 01-cars
rename table
fill in seeds file with dummy data
save seed file
exeucte
npx knex seed: run



*/