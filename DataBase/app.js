const sqlite3 = require('sqlite3').verbose();
let sql;


//connect to DB
const dbPath = '/data/database.db'; 
const db = new sqlite3.Database('/data/database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => { // Added OPEN_CREATE to ensure DB is created if not exists
    if (err) {
        db.close();
        return console.error(err.message);
    }
    console.log('Connected to the SQLite database.');

    // Create table if it doesn't exist
    sql = 'CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,first_name,last_name,username,password,email)';
    db.run(sql, (err) => {
        if (err) {
            db.close();
            return console.error("Error creating table:", err.message);
        }
        console.log("Table 'users' created or already exists.");
    db.run("DELETE FROM users", (deleteErr) => {
        if (deleteErr) {
            db.close();
            return console.error("Error clearing table:", deleteErr.message);
        }
        console.log("Table 'users' cleared.");
        // Optional: Clear existing data if you want to start fresh each time, instead of dropping and recreating
        // db.run("DELETE FROM users", (err) => {
        //    if (err) return console.error("Error clearing table:", err.message);
        //    console.log("Table 'users' cleared.");
        // });

        //Insert data into table
        sql = 'INSERT INTO users(first_name,last_name,username,password,email) VALUES (?,?,?,?,?)';
        db.run(
            sql,
            ["Ptisuisse", "Ptisuissonn","ptisuisse_user", "test", "ptisuisse@ptisuisse.com"],
            (err) => {
                if (err) {
                    db.close();
                    return console.error("Error inserting data:", err.message);
                }
                console.log("Data inserted into 'users' table.");

                //query the data
                sql = 'SELECT * FROM users';
                db.all(sql, [], (err,rows) => {
                    if (err) {
                        db.close();
                        return console.error("Error querying data:", err.message);
                    }
                    rows.forEach((row) => {
                        console.log(row);
                    });

                    //update data
                    // sql = 'UPDATE users SET first_name = ? WHERE id = ?';
                    // db.run(sql, ['jake',1], (err) => {
                    //     if (err) return console.error("Error updating data:", err.message);
                    //     console.log("Data updated.");

                        //delete data
                        // sql = 'DELETE FROM users WHERE id = ?';
                        // db.run(sql, [1], (err) => {
                        //     if (err) return console.error("Error deleting data:", err.message);
                        //     console.log("Data deleted.");

                            // Close the database connection after all operations are done
                            // db.close((err) => {
                            //     if (err) {
                            //         return console.error(err.message);
                            //     }
                            //     console.log('Closed the database connection.');
                            // });
                            console.log('Database initialization complete. The script will remain running.'); // Add a log message
                        });
                    });
                });
            }
        );
    });
// });
setInterval(() => {
  }, 1000 * 60 * 60); 