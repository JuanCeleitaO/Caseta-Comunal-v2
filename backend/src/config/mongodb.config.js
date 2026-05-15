const mongoose = require("mongoose");

const URI = process.env.MONGO_URI || "mongodb://caseta-mongo:27017/db_caseta";

const connectMongo = async () => {
  try {
    await mongoose.connect(URI);
    console.log("✅ MongoDB: Conexión establecida con éxito.");
  } catch (error) {
    console.error("❌ MongoDB: Error al conectar.", error);
  }
};

module.exports = connectMongo;
