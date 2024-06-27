import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'root',
    password: 'naruto12',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Test the connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database.');

       
        connection.release();
    })
    .catch(error => {
        console.error('Error connecting to MySQL:', error);
        process.exit(1); 
    });

export default pool;
