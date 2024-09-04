const express = require('express');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Obtener un usuario por ID
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

// Actualizar un usuario por ID
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
});

// Eliminar un usuario por ID
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
});

module.exports = router;