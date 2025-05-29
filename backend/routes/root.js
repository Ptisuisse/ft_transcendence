// filepath: backend/routes/root.js
'use strict'

const authenticate = require('../plugins/authenticate');

module.exports = async function (fastify, opts) {
  fastify.addHook('preHandler', authenticate);

  fastify.get('/', async function (request, reply) {
    // Exemple : requête vers l'API du service db pour vérifier la connexion
    try {
      const response = await require('axios').get('http://db:4000/users/test@example.com');
      return { root: true, user: response.data };
    } catch (err) {
      return { root: true, user: null, error: err.message };
    }
  });

  // Route GET pour lister tous les utilisateurs
  fastify.get('/users', async function (request, reply) {
    try {
      const response = await require('axios').get('http://db:4000/users');
      return response.data;
    } catch (err) {
      reply.code(500).send({ error: 'Error fetching users', details: err.message });
    }
  });

  // Route POST pour ajouter un utilisateur (username et email uniquement)
  fastify.post('/users', async function (request, reply) {
    const { username, email } = request.body;
    if (!username || !email) {
      reply.code(400).send({ error: 'username and email are required' });
      return;
    }
    try {
      const response = await require('axios').post('http://db:4000/users', { username, email });
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 409) {
        reply.code(409).send({ error: 'Email already exists' });
      } else {
        reply.code(500).send({ error: 'Error inserting user', details: err.message });
      }
    }
  });
}