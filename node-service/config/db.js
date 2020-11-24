const dotenv = require('dotenv').config({path:__dirname + '/.env'});
const mysql = require('mysql2');
// Connection pool
console.log("========================");
console.log(dotenv);
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password:process.env.DB_PASS || '',
    database: process.env.DB_DATABASE || 'test',
    waitForConnections: true,
    connectionLimit: process.env.DB_MAX_CONN || 10,
    queueLimit: 0
  });

// Handle errors...
process.on('uncaughtException', function (err) {
    console.error(err);    
    pool.end();
    process.exit();
  });
process.on('SIGINT', function() {
    
    pool.end();   
    process.exit();
});

module.exports = pool;