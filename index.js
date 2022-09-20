import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// Conectar la BBDD
db.authenticate()
  .then( () => console.log('BBDD conectada!!') )
  .catch( (error) => console.log(error) ); 

// Crear Port
const port = process.env.PORT || 3000;

// Habilitar Template Engine - PUG
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req,res,next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = 'Agencia de Viajes';
  next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


// Definir la carpeta Public
app.use(express.static('public'));

// Agregar Router a la app
app.use('/', router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

