'use strict'

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '466591943367-vfpoq4upenktcjdtb0kv0hd7mc8bidrt.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

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

      // Insère l'utilisateur dans la base s'il n'existe pas déjà
      await new Promise((resolve, reject) => {
        fastify.db.run(
          'INSERT OR IGNORE INTO users(username, email) VALUES (?, ?)',
          [name, email],
          function (err) {
            if (err) {
              request.log.error(err);
              return reject(new Error('Error inserting user'));
            }
            resolve();
          }
        );
      });

      // Retourner le nom et la photo au frontend
      return { name, picture };
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