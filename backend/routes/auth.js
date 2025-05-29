'use strict'

const { OAuth2Client } = require('google-auth-library');
const jwtLib = require('jsonwebtoken');
const CLIENT_ID = '466591943367-vfpoq4upenktcjdtb0kv0hd7mc8bidrt.apps.googleusercontent.com';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const client = new OAuth2Client(CLIENT_ID);
const axios = require('axios');

module.exports = async function (fastify, opts) {
  fastify.post('/auth/google', async function (request, reply) {
    const { jwt } = request.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: jwt,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { sub, email, name, picture } = payload;

      // Appel à l'API du service db pour insérer ou mettre à jour l'utilisateur
      await axios.post('http://db:4000/users', { username: name, email });

      // Générer un JWT pour la persistance de session
      const token = jwtLib.sign({ email, name, picture }, JWT_SECRET, { expiresIn: '7d' });

      // Retourner le nom, la photo et le token au frontend
      return { name, picture, token };
    } catch (err) {
      reply.code(401).send({ ok: false, message: 'Token Google invalide', error: err.message });
    }
  });
}

//Parse the JWT token from Google
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = Buffer.from(base64, 'base64').toString('utf-8');
  return JSON.parse(jsonPayload);
}