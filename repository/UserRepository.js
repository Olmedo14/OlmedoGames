const UserDAO = require('../dao/UserDAO');
const UserDTO = require('../dto/UserDTO');

class UserRepository {
    async getUserById(id) {
        try {
            const user = await UserDAO.getById(id);
            if (!user) throw new Error('User not found');
            return new UserDTO(user);
        } catch (error) {
            throw new Error(`Error getting user by ID: ${error.message}`);
        }
    }

    async createUser(user) {
        try {
            const newUser = await UserDAO.create(user);
            return new UserDTO(newUser);
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
}

module.exports = new UserRepository();