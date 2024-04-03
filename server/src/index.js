const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

// Middleware de manejo de errores global
app.use(errorHandler);

module.exports = app;
