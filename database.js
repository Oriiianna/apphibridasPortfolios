const { MongoClient } = require('mongodb');
const config = require('./config');

// Cache de conexión para funcionar bien en entornos serverless (Vercel reutiliza instancias)
let cached = global._mongoCache;
if (!cached) {
  cached = global._mongoCache = { client: null, db: null };
}

async function connectToDatabase() {
  if (cached.db) {
    return cached.db;
  }

  if (!config.MONGODB_URI) {
    const msg = 'MONGODB_URI no está definido en las variables de entorno';
    console.error(msg);
    throw new Error(msg);
  }

  try {
    const client = new MongoClient(config.MONGODB_URI);
    await client.connect();
    cached.client = client;
    cached.db = client.db(config.DB_NAME);
    console.log('Conectado a MongoDB Atlas');
    return cached.db;
  } catch (error) {
    console.error('Error conectando a MongoDB:', error?.message || error);
    // En serverless no hagas process.exit; lanza el error para que la función responda 500
    throw error;
  }
}

function getDatabase() {
  if (!cached.db) {
    throw new Error('Base de datos no inicializada. Llama primero a connectToDatabase()');
  }
  return cached.db;
}

module.exports = {
  connectToDatabase,
  getDatabase
};
