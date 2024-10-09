const express = require('express');
const passport = require('passport');
const UserRepository = require('../repository/UserRepository');
const User = require('../models/User');
const UserDTO = require('../dto/UserDTO');
const authMiddleware = require('../middlewares/authMiddleware')('admin'); // Requiere rol de administrador
const router = express.Router();

// Ruta para obtener el usuario actual (utilizando DTO)
router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const userDTO = await UserRepository.getUserById(req.user.id);
        res.json(userDTO);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Obtener todos los usuarios (requiere rol de admin)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

// Obtener un usuario por ID (requiere rol de admin)
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
});

// Actualizar un usuario por ID (requiere rol de admin)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
});

// Eliminar un usuario por ID (requiere rol de admin)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
});

module.exports = router;