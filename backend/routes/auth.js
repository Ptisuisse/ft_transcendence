'use strict'

const { OAuth2Client } = require('google-auth-library');
const jwtLib = require('jsonwebtoken');
const CLIENT_ID = '466591943367-vfpoq4upenktcjdtb0kv0hd7mc8bidrt.apps.googleusercontent.com';
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(CLIENT_ID);
const axios = require('axios');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const twoFACodes = {};

module.exports = async function (fastify, opts) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }
  fastify.post('/auth/google', async function (request, reply) {
    const { jwt } = request.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: jwt,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { sub, email, name, picture } = payload;

      await axios.post('http://db:4000/users', { username: name, email });

      const token = jwtLib.sign({ email, name, picture }, JWT_SECRET, { expiresIn: '7d' });

      return { name, picture, token };
    } catch (err) {
      reply.code(401).send({ ok: false, message: 'Token Google invalide', error: err.message });
    }
  });

  fastify.post('/auth/2fa/send', async function (request, reply) {
    try {
      const { email } = request.body;
      if (!email) {
        return reply.code(400).send({ ok: false, message: 'Email requis' });
      }
      const code = crypto.randomInt(100000, 1000000).toString();
      twoFACodes[email] = { code, expires: Date.now() + 5 * 60 * 1000 };

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Votre code de connexion 2FA',
        text: `Votre code de vérification est : ${code}`,
      });

      return { ok: true, message: 'Code envoyé par email' };
    } catch (err) {
      console.error("Erreur lors de l'envoi du code 2FA:", err);
      reply.code(500).send({ ok: false, message: "Erreur lors de l'envoi de l'email de vérification" });
    }
  });

  fastify.post('/auth/2fa/verify', async function (request, reply) {
    const { email, code } = request.body;
    if (!email || !code) {
      return reply.code(400).send({ ok: false, message: 'Code incorrect' });
    }
    const entry = twoFACodes[email];
    if (!entry || entry.code !== code || entry.expires < Date.now()) {
      let message = 'Code invalide ou expiré';
      if (entry && entry.code !== code) message = 'Code incorrect';
      if (entry && entry.expires < Date.now()) message = 'Code expiré';
      if (!code) message = 'Code incorrect';
      return reply.code(401).send({ ok: false, message });
    }
    delete twoFACodes[email];
    return { ok: true, message: 'Code validé' };
  });
}