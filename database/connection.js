const mysql = require('mysql2/promise');

const bd_user = 'ewerton_node';
const bd_password = '123456';
const bd_host = '10.67.22.216';
const bd_port = 3306;
const bd_database = 'ewerton_node';

const connection = mysql.createConnection({
    user: bd_user,
    password: bd_password,
    host: bd_host,
    port: bd_port,
    database:bd_database,
})