const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Cita = require('./models/cita.model');  // Asegúrate de importar el modelo de Cita

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');  // Ruta donde se encuentran tus archivos .ejs

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz (/) que renderiza index.ejs con las citas
app.get('/', async (req, res) => {
  try {
    // Obtén todas las citas de la base de datos
    const citas = await Cita.find();
    // Renderiza la vista con los datos de las citas
    res.render('index', { citas });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las citas');
  }
});

// Rutas para manejar las citas
app.use('/citas', require('./routes/citas.routes'));  // Maneja las citas en la ruta /citas

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Clinica')  // Conexión a la base de datos 'Clinica'
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));


