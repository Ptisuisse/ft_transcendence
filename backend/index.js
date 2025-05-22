// backend/index.js
require('dotenv').config();
const fastify = require('fastify')({ logger: true });

// Charge app.js qui va autoload plugins et routes
fastify.register(require('./app'));

// SUPPRIME cette route, elle fait doublon avec routes/root.js
// fastify.get('/', async (request, reply) => {
//   return { message: 'Hello from Fastify!' };
// });

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log(`🚀 Server is running at http://0.0.0.0:${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();