// server/src/index.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');



const app = express();

app.use(cors());
app.use(express.json());

// Sirve los archivos estáticos de la carpeta 'assets' que está dentro de 'src'
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/users', userRoutes);

// Middleware de manejo de errores global
app.use(errorHandler);

module.exports = app;
