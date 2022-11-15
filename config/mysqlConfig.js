require('dotenv').config();
const mysql = require('mysql2/promise');
const config = {
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    dateStrings: true,
}


const mysqlConnection = mysql.createPool(config);

module.exports = { mysql, config, mysqlConnection }