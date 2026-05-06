const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB: Conexión establecida con éxito.');
  } catch (error) {
    console.error('MongoDB: Error al conectar.', error);
    process.exit(1);
  }
};

module.exports = connectMongo;