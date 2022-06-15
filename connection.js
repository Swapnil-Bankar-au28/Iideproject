const mysql = require('mysql2')

var mysqlConnection = mysql.createConnection({
    host: 'localhost',

    user: 'root',
    password: 'Swapnil321@',
    connetionLimit: 10,
    database: "student",
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});
module.exports.mysqlConnection = mysqlConnection;