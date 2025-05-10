// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Importar el modelo
const Professional = require('./models/professional');

// Ruta para obtener los datos profesionales
app.get('/professional', async (req, res) => {
  try {
    // Buscar el primer documento en la colección
    let professional = await Professional.findOne();
    
    // Si no existe, crear uno con los datos por defecto
    if (!professional) {
      const defaultData = require('./data');
      professional = new Professional(defaultData);
      await professional.save();
    }
    
    res.json(professional);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
