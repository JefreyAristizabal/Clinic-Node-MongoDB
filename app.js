const express = require('express');
const mongoose = require('./config/db'); // Importamos la conexión a MongoDB desde db.js
const config = require('./config/config'); // Importamos las configuraciones

const app = express();

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola, Mundo!');
});

// Iniciar servidor
app.listen(config.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.port}`);
});