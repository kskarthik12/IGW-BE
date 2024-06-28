import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // AWS RDS endpoint
    user: 'admin',               // RDS username
    password: 'Sunflower12#',   // RDS password
    database: process.env.DB_NAME,   // Database name
    waitForConnections: true,
    connectionLimit: 10,             
    queueLimit: 0
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
