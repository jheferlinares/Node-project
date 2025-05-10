// backend/initDb.js
require('dotenv').config();
const mongoose = require('mongoose');
const Professional = require('./models/professional');
const defaultData = require('./data');

async function initDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');
    
    // Buscar si existe un documento
    const existingDoc = await Professional.findOne();
    
    if (existingDoc) {
      // Si existe, actualizarlo con los datos de data.js
      await Professional.updateOne({}, defaultData);
      console.log('Documento actualizado con datos de data.js');
    } else {
      // Si no existe, crear uno nuevo
      const professional = new Professional(defaultData);
      await professional.save();
      console.log('Documento creado con datos de data.js');
    }
    
    // Mostrar el documento actualizado
    const updatedDoc = await Professional.findOne();
    console.log('Datos actualizados:', updatedDoc.professionalName);
    
    mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada');
  } catch (error) {
    console.error('Error:', error);
  }
}

initDb();