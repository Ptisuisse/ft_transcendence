import Fastify, { FastifyInstance } from 'fastify';

// Initialiser Fastify avec un logger pour que server.log soit disponible
const server: FastifyInstance = Fastify({
  logger: true,
});

server.get('/ping', async (request, reply) => {
  return { pong: true };
});

const startServer = async () => {
  try {
    // Écouter sur 0.0.0.0 pour accepter les connexions de l'extérieur du conteneur
    // (via le réseau Docker) et de l'intérieur.
    await server.listen({ port: 3000, host: '0.0.0.0' });
    // Le logger de Fastify affichera l'adresse d'écoute, donc le console.log personnalisé n'est pas strictement nécessaire ici.
    // Si vous voulez un log spécifique : server.log.info(`🚀 Server listening at http://0.0.0.0:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

startServer();
