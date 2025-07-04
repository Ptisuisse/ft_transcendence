'use strict';

const { submitScore, getAllScores } = require('../plugins/blockchain');

module.exports = async function (fastify, opts) {
  // Route POST pour enregistrer un score
<<<<<<< HEAD
  fastify.post('/score/submit', async (request, reply) => {
=======
  fastify.post('/api/score/submit', async (request, reply) => {
>>>>>>> a999fbfb311da45b4e9af7e0c40c242d128f337b
    try {
      console.log('[score/submit] body:', request.body);
      const { winner, score, scoreDetail } = request.body;
      const txHash = await submitScore(score, winner, scoreDetail);
      console.log('[score/submit] txHash:', txHash);
      return { success: true, txHash, winner };
    } catch (err) {
      console.error('[score/submit] Error:', err);
      return reply.code(500).send({ error: err.message });
    }
  });

  // Route GET pour récupérer tous les scores
<<<<<<< HEAD
  fastify.get('/score/all', async (request, reply) => {
=======
  fastify.get('/api/score/all', async (request, reply) => {
>>>>>>> a999fbfb311da45b4e9af7e0c40c242d128f337b
    try {
      const scores = await getAllScores();
      return scores;
    } catch (err) {
      return reply.code(500).send({ error: err.message });
    }
  });
};
