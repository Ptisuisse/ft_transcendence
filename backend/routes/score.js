'use strict';

const { submitScore, getAllScores } = require('../plugins/blockchain');

module.exports = async function (fastify, opts) {
  // Route POST pour enregistrer un score
  fastify.post('/score/submit', async (request, reply) => {
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
  fastify.get('/score/all', async (request, reply) => {
    try {
      const scores = await getAllScores();
      return scores;
    } catch (err) {
      return reply.code(500).send({ error: err.message });
    }
  });
};
