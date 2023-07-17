const mysql = require('mysql');



var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    port:3306,
    database: 'tanasvidb',
    multipleStatements: true
});


module.exports = mysqlConnection;