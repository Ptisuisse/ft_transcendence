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

  // Example: Add a new user (ensure your table structure matches)
  fastify.post('/users', async function (request, reply) {
    const { first_name, last_name, username, password, email } = request.body;
    const sql = 'INSERT INTO users(first_name, last_name, username, password, email) VALUES (?,?,?,?,?)';
    
    return new Promise((resolve, reject) => {
      fastify.db.run(sql, [first_name, last_name, username, password, email], function(err) {
        if (err) {
          request.log.error(err);
          return reject(new Error('Error inserting user'));
        }
        resolve({ message: 'User created', userId: this.lastID });
      });
    });
  });
}