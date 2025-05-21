const sqlite3 = require('sqlite3').verbose();
let sql;

// Chemin de la base de données dans le conteneur
const dbPath = '/usr/src/app/data/database.db'; 
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected to the SQLite database.');

    // Création d'une table users simple : id, username, email
    sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, email TEXT NOT NULL UNIQUE)';
    db.run(sql, (err) => {
        if (err) {
            console.error("Error creating table users:", err.message);
            return;
        }
        console.log("Table 'users' created or already exists.");
    });
});

// Garde le script en vie
setInterval(() => {}, 1000 * 60 * 60);
