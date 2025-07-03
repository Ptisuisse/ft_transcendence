'use strict';

const { submitScore, getAllScores } = require('../plugins/blockchain');

module.exports = async function (fastify, opts) {
  // Route POST pour enregistrer un score
  fastify.post('/score/submit', async (request, reply) => {
    try {
      const { score } = request.body;
      if (typeof score !== 'number') {
        return reply.code(400).send({ error: 'Score must be a number' });
      }
      const txHash = await submitScore(score);
      return { success: true, txHash };
    } catch (err) {
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
