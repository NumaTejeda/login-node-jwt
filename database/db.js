const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE_NAME
})

conexion.connect((error) => {
    if (error) {
        console.log('El error de conexion es: ' + error);
        return;
    }
    console.log('Conexion exitosa a la BD MYSQL');
})

module.exports = conexion;