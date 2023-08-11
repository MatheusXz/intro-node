const mysql = require('mysql2/promise');

const bd_user = 'ewerton_node';
const bd_port = 3306;
const bd_password = '123456';
const bd_host = '10.67.22.216';
const bd_database = 'ewerton_node';

const config = {
    host: bd_host,
    port: bd_port,
    user: bd_user,
    password: bd_password,
    database: bd_database,
    waitForConnections: true,
    connectTimeout: 10,
    queueLimit: 0,
}

try {
    connection = mysql.createPool(config);
    console.log("Chamou conexão MySql!");
} catch {
    console.log(error);
}

module.exports = connection;