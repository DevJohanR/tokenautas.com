//server/src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Ocurrió un error en el servidor');
  };
  
  module.exports = errorHandler;
  