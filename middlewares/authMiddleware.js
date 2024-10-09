const jwt = require('jsonwebtoken');
const UserRepository = require('../repository/UserRepository');

// Middleware de autorización

module.exports = (requiredRole) => {
    return async (req, res, next) => {
        // Obtener el token de la cabecera

        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        try {
            // Verificar y decodificar el token

            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utiliza la clave secreta de las variables de entorno
            req.user = decoded.user;

            // Obtener el usuario desde el repositorio

            const userDTO = await UserRepository.getUserById(req.user.id);

            // Verificar el rol del usuario

            if (requiredRole && userDTO.role !== requiredRole) {
                return res.status(403).json({ msg: 'Permission denied' });
            }

            // Continuar al siguiente middleware/route handler
            
            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    }
};