const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();

// Middlewares

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Conexión a MongoDB

mongoose.connect(process.env.DB_URL) // Usar la URL de la base de datos desde las variables de entorno
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

// Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/carts', require('./routes/carts'));  // Añadir esta línea para las rutas de carts

// Inicia el servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});