var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost', // Replace with your host name
    user: 'developers',      // Replace with your database username
    password: '{superSecretDevPassword!1234}',      // Replace with your database password
    database: 'es_extended_new' // // Replace with your database Name
}); 

conn.connect(function(err) {

    if (err) throw err;

    console.log('Database is connected successfully !');

});


module.exports = conn;