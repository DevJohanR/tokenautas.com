// Importa la versión con promesas de mysql2 para facilitar el uso de async/await
const mysql = require('mysql2/promise');

// Configuración del pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,        // Dirección del servidor de la base de datos
    user: process.env.DB_USER,        // Usuario de la base de datos
    password: process.env.DB_PASS,    // Contraseña del usuario de la base de datos
    database: process.env.DB_NAME,    // Nombre de la base de datos
    waitForConnections: true,         // El pool esperará por conexiones si no hay ninguna disponible
    connectionLimit: 10,              // Límite de conexiones que el pool mantendrá en espera
    queueLimit: 0                     // Límite de peticiones en espera; 0 significa sin límite
});

// Exporta el pool para que pueda ser utilizado en otros archivos del proyecto
module.exports = pool;
