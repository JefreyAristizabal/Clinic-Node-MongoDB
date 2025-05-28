require('dotenv').config(); // Usamos dotenv para cargar variables de entorno desde un archivo .env

const config = {
    dbURI: process.env.MONGO_URI || 'mongodb://localhost:27017/Clinica', // Base de datos de MongoDB
    port: process.env.PORT || 3000, // Puerto donde corre la app Express
};

module.exports = config;