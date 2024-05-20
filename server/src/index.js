// server/src/index.js

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const withdrawalsRoutes = require('./routes/withdrawalsRoutes'); // Importa las rutas de retiros
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Sirve los archivos estáticos de la carpeta 'public_html'
app.use(express.static(path.join(__dirname, '../../public_html')));

// Sirve los archivos estáticos de la carpeta 'assets' dentro de 'src'
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/users', userRoutes);
app.use('/withdrawals', withdrawalsRoutes);

// Middleware de manejo de errores global
app.use(errorHandler);

// Middleware para manejar las rutas de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public_html', 'index.html'));
});

module.exports = app;




//VERSION 100% FUNCIONAL
/*
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const withdrawalsRoutes = require('./routes/withdrawalsRoutes'); // Importa las rutas de retiros

const errorHandler = require('./middleware/errorHandler');
const path = require('path');



const app = express();

app.use(cors());
app.use(express.json());

// Sirve los archivos estáticos de la carpeta 'assets' que está dentro de 'src'
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/users', userRoutes);
app.use('/withdrawals', withdrawalsRoutes);

// Middleware de manejo de errores global
app.use(errorHandler);

module.exports = app;
*/
