// src/models/cita.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema de la cita
const citaSchema = new Schema({
  paciente: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  motivo: { type: String, required: false }
});

// Asegúrate de que el nombre de la colección sea "Citas" (con C mayúscula)
module.exports = mongoose.model('Cita', citaSchema, 'Citas');

