// Configuración con soporte para variables de entorno
module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://pablodybel:mostaza2001@pablodybel.b0itxpn.mongodb.net/AH20232CP1',
    PORT: process.env.PORT || 3333,
    DB_NAME: process.env.DB_NAME || 'AH20232CP1',
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_NAME: process.env.APP_NAME || 'Portfolio API',
    APP_VERSION: process.env.APP_VERSION || '2.0.0'
};
