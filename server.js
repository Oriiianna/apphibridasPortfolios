const express = require('express');
const path = require('path');
const { connectToDatabase } = require('./database');
const config = require('./config');

// Importar rutas
const apiRoutes = require('./routes/index');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Asegurar conexión a la base de datos por solicitud (crucial en entornos serverless)
app.use(async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (err) {
        console.error('Fallo al conectar a la base de datos:', err?.message || err);
        res.status(500).json({ error: 'Error de conexión a la base de datos' });
    }
});

// Rutas de la API - Usando arquitectura MVC
app.use('/api', apiRoutes);

// Rutas del frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/section/:sectionName', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'section.html'));
});

// Exportar app para uso en Vercel y levantar servidor solo en entorno local
const PORT = config.PORT || 3333;
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;
