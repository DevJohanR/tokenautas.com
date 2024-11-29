// server/src/index.js
//test
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const withdrawalsRoutes = require('./routes/withdrawalsRoutes'); // Importa las rutas de retiros
const multer = require('multer'); // Asegúrate de importar multer

const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const mysql = require('mysql2/promise'); // Importa mysql2/promise




const app = express();

app.use(cors());
app.use(express.json());

// Sirve los archivos estáticos de la carpeta 'assets' que está dentro de 'src'
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/users', userRoutes);
app.use('/withdrawals', withdrawalsRoutes);

/*
//todo ira aqui adentro chatgpt

*/
// Configuración de Multer para manejo de archivos
const uploadDir = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Configuración de base de datos
const dbConfig = {
  host: 'srv1180.hstgr.io',
  user: 'u491711087_gestor',
  password: 'vS79gdq123',
  database: 'u491711087_gestion',
};
let db;

(async () => {
  try {
    db = await mysql.createPool(dbConfig);

    // Crear tablas si no existen
    await db.query(`
      CREATE TABLE IF NOT EXISTS independientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        fechaNacimiento DATE,
        ciudadResidencia VARCHAR(255),
        departamento VARCHAR(255),
        telefono VARCHAR(255),
        numeroDocumento VARCHAR(255),
        plataforma VARCHAR(255),
        tipoGestion VARCHAR(255),
        tipoPagina VARCHAR(255),
        fotoCedulaFrontal VARCHAR(255),
        fotoCedulaTrasera VARCHAR(255),
        fotoCedulaConRostro VARCHAR(255),
        licenciaConducir VARCHAR(255),
         fotoDocumentoHojaEnBlanco VARCHAR(255)
      );
    `);
    await db.query(`
      CREATE TABLE IF NOT EXISTS agencias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        fechaNacimiento DATE,
        ciudadResidencia VARCHAR(255),
        departamento VARCHAR(255),
        telefono VARCHAR(255),
        numeroDocumento VARCHAR(255),
        plataforma VARCHAR(255),
        tipoGestion VARCHAR(255),
        tipoPagina VARCHAR(255),
        fotoCedulaFrontal VARCHAR(255),
        fotoCedulaTrasera VARCHAR(255),
        fotoCedulaConRostro VARCHAR(255),
        licenciaConducir VARCHAR(255),
         fotoDocumentoHojaEnBlanco VARCHAR(255)
      );
    `);
    console.log('Conexión a la base de datos establecida y tablas listas.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
})();

// Rutas
app.post(
  '/api/submit/:type',
  upload.fields([
    { name: 'fotoCedulaFrontal' },
    { name: 'fotoCedulaTrasera' },
    { name: 'fotoCedulaConRostro' },
    { name: 'licenciaConducir' },
    { name: 'fotoDocumentoHojaEnBlanco' },
  ]),
  async (req, res) => {
    const { type } = req.params;
    const data = req.body;
    const files = req.files;

    if (!['independientes', 'agencias'].includes(type)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }

    const table = type;

    try {
      const query = `
        INSERT INTO ${table} (email, nombre, fechaNacimiento, ciudadResidencia, departamento, telefono, numeroDocumento, plataforma, tipoGestion, tipoPagina, fotoCedulaFrontal, fotoCedulaTrasera, fotoCedulaConRostro, licenciaConducir,fotoDocumentoHojaEnBlanco)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.email,
        data.nombre,
        data.fechaNacimiento,
        data.ciudadResidencia,
        data.departamento,
        data.telefono,
        data.numeroDocumento,
        data.plataforma,
        data.tipoGestion,
        data.tipoPagina,
        files.fotoCedulaFrontal ? files.fotoCedulaFrontal[0].filename : null,
        files.fotoCedulaTrasera ? files.fotoCedulaTrasera[0].filename : null,
        files.fotoCedulaConRostro ? files.fotoCedulaConRostro[0].filename : null,
        files.licenciaConducir ? files.licenciaConducir[0].filename : null,
        files.fotoDocumentoHojaEnBlanco ? files.fotoDocumentoHojaEnBlanco[0].filename : null, // Nuevo campo
      ];

      await db.query(query, values);

      res.status(200).json({ message: 'Datos guardados con éxito' });
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      res.status(500).json({
        error: 'Ocurrió un error interno al guardar los datos. Verifique la consola del servidor.',
      });
    }
  }
);

app.get('/api/admin/:type', async (req, res) => {
  const { type } = req.params;

  if (!['independientes', 'agencias'].includes(type)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }

  try {
    const [results] = await db.query(`SELECT email FROM ${type}`);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({
      error: 'Ocurrió un error interno al obtener los datos. Verifique la consola del servidor.',
    });
  }
});

app.get('/api/detail/:type/:email', async (req, res) => {
  const { type, email } = req.params;

  if (!['independientes', 'agencias'].includes(type)) {
    return res.status(400).json({ error: 'Tipo inválido' });
  }

  try {
    const [results] = await db.query(`SELECT * FROM ${type} WHERE email = ?`, [email]);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No se encontró el registro' });
    }
    res.status(200).json(results[0]);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({
      error: 'Ocurrió un error interno al obtener los datos. Verifique la consola del servidor.',
    });
  }
});

// Servir archivos subidos
app.use('/uploads', express.static(uploadDir));




// Middleware de manejo de errores global
app.use(errorHandler);

module.exports = app;
