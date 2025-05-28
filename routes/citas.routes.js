const express = require('express');
const Cita = require('../models/cita.model'); // Modelo con "Citas"
const router = express.Router();

// Ruta GET para obtener todas las citas
router.get('/', async (req, res) => {
  try {
    const citas = await Cita.find();
    res.render('index', { citas });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener las citas');
  }
});

// Ruta POST para guardar una nueva cita
router.post('/', async (req, res) => {
  try {
    const nueva = new Cita(req.body);
    await nueva.save();
    res.redirect('/');  // Redirige a la página principal
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al guardar la cita');
  }
});

// Ruta GET para eliminar una cita por ID
router.get('/eliminar/:id', async (req, res) => {
  try {
    const citaId = req.params.id; // Obtener el ID de la cita
    const result = await Cita.findByIdAndDelete(citaId); // Eliminar la cita por su ID
    
    if (result) {
      res.json({ success: true, message: 'Cita eliminada correctamente' });
    } else {
      res.json({ success: false, message: 'Cita no encontrada' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar la cita');
  }
});

// Ruta GET para editar una cita por ID
router.get('/editar/:id', async (req, res) => {
  try {
    const citaId = req.params.id; // Obtener el ID de la cita
    const cita = await Cita.findById(citaId); // Buscar la cita en la base de datos

    if (!cita) {
      return res.status(404).send('Cita no encontrada');
    }

    res.render('editar', { cita }); // Renderizar la vista "editar" pasando los datos de la cita
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener la cita');
  }
});

// Ruta POST para actualizar una cita
router.post('/editar/:id', async (req, res) => {
  try {
    const citaId = req.params.id; // Obtener el ID de la cita
    const { paciente, fecha, hora, motivo } = req.body; // Obtener los nuevos datos del formulario

    // Actualizar la cita en la base de datos
    const citaActualizada = await Cita.findByIdAndUpdate(citaId, {
      paciente,
      fecha,
      hora,
      motivo
    }, { new: true }); // "new: true" para obtener el documento actualizado

    if (!citaActualizada) {
      return res.status(404).send('Cita no encontrada');
    }

    res.redirect('/');  // Redirigir a la página principal o a la vista de citas actualizadas
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar la cita');
  }
});

module.exports = router;



