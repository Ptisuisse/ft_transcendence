// filepath: backend/plugins/database.js
'use strict'

const fp = require('fastify-plugin')
const sqlite3 = require('sqlite3').verbose()

// Define the path to the database file as seen from the backend container
const path = require('path');
const dbPath = path.join(__dirname, '../../DataBase/data/database.db');

async function dbConnector (fastify, options) {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      fastify.log.error(`Error connecting to SQLite database: ${err.message}`);
      // Depending on your error handling strategy, you might want to throw the error
      // or gracefully handle it, perhaps preventing the server from starting.
      throw err; 
    } else {
      fastify.log.info('Successfully connected to the SQLite database.');
    }
  });

  // Decorate Fastify with the db instance
  fastify.decorate('db', db);

  // Close the database connection when Fastify server closes
  fastify.addHook('onClose', (instance, done) => {
    db.close((err) => {
      if (err) {
        instance.log.error(`Error closing the SQLite database: ${err.message}`);
        return done(err);
      }
      instance.log.info('SQLite database connection closed.');
      done();
    });
  });
}

module.exports = fp(dbConnector);