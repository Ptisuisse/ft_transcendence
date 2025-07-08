
'use strict'

const jwtLib = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authenticate(request, reply, done) {
  if (!JWT_SECRET) {

    return done(new Error('JWT_SECRET is not configured on the server.'));
  }

  if (!request.raw || !reply.raw) return done();

  if (!request.headers || !request.headers['authorization'] || !request.headers['authorization'].startsWith('Bearer ')) {
    reply.code(401).send({ ok: false, message: 'Token manquant ou invalide' });
    return done();
  }
  const token = request.headers['authorization'].split(' ')[1];
  try {
    const decoded = jwtLib.verify(token, JWT_SECRET);
    request.user = decoded;
    done();
  } catch (err) {
    reply.code(401).send({ ok: false, message: 'Token invalide', error: err.message });
    done();
  }
}

module.exports = authenticate;
