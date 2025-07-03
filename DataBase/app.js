const sqlite3 = require('sqlite3').verbose();
let sql;

// Chemin de la base de données dans le conteneur
const dbPath = '/usr/src/app/data/database.db'; 
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    //console.log('Connected to the SQLite database.');

    // Création d'une table users simple : id, username, email
    sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, email TEXT NOT NULL UNIQUE)';
    db.run(sql, (err) => {
        if (err) {
            console.error("Error creating table users:", err.message);
            return;
        }
        //console.log("Table 'users' created or already exists.");
    });
});

// Garde le script en vie
setInterval(() => {}, 1000 * 60 * 60);

const fastify = require('fastify')({ logger: true });

// Route pour insérer un utilisateur uniquement si l'email n'existe pas déjà
fastify.post('/users', async (request, reply) => {
    const { username, email } = request.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            return reply.code(500).send({ ok: false, message: 'DB error', error: err.message });
        }
        if (row) {
            return reply.code(409).send({ ok: false, message: 'Email already exists' });
        }
        db.run(
            'INSERT INTO users(username, email) VALUES (?, ?)',
            [username, email],
            function (err) {
                if (err) {
                    return reply.code(500).send({ ok: false, message: 'DB error', error: err.message });
                }
                return reply.send({ ok: true });
            }
        );
    });
});

// Route pour récupérer un utilisateur par email
fastify.get('/users/:email', async (request, reply) => {
    const { email } = request.params;
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                reply.code(500).send({ ok: false, message: 'DB error', error: err.message });
                return reject(err);
            }
            if (!row) {
                reply.code(404).send({ ok: false, message: 'User not found' });
                return resolve();
            }
            resolve(row);
        });
    });
});

// Route pour lister tous les utilisateurs (seulement id, username, email)
fastify.get('/users', async (request, reply) => {
    db.all('SELECT id, username, email FROM users', [], (err, rows) => {
        //console.log('Résultat SQL /users:', rows);
        if (err) {
            return reply.code(500).send({ ok: false, message: 'DB error', error: err.message });
        }
        return reply.send(rows);
    });
});

// Lancer le serveur Fastify
fastify.listen({ port: 4000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    //console.log(`DB API listening on ${address}`);
});
