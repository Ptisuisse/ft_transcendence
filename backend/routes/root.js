// filepath: backend/routes/root.js
'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    // Example: Querying the database
    // Make sure the 'users' table exists as created by DataBase/app.js
    return new Promise((resolve, reject) => {
      fastify.db.all("SELECT * FROM users LIMIT 1", [], (err, rows) => {
        if (err) {
          request.log.error(err);
          return reject(new Error('Error querying database'));
        }
        resolve({ root: true, firstUser: rows.length > 0 ? rows[0] : null });
      });
    });
  });

  // Route GET pour lister tous les utilisateurs
  fastify.get('/users', async function (request, reply) {
    return new Promise((resolve, reject) => {
      fastify.db.all('SELECT id, username, email FROM users', [], (err, rows) => {
        if (err) {
          request.log.error(err);
          return reject(new Error('Error querying users'));
        }
        resolve({ users: rows });
      });
    });
  });

  // Route POST pour ajouter un utilisateur (username et email uniquement)
  fastify.post('/users', async function (request, reply) {
    const { username, email } = request.body;
    if (!username || !email) {
      reply.code(400).send({ error: 'username and email are required' });
      return;
    }
    const sql = 'INSERT INTO users(username, email) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      fastify.db.run(sql, [username, email], function(err) {
        if (err) {
          request.log.error(err);
          if (err.message.includes('UNIQUE')) {
            return reject(fastify.httpErrors.conflict('Email already exists'));
          }
          return reject(new Error('Error inserting user'));
        }
        resolve({ message: 'User created', userId: this.lastID });
      });
    });
  });
}