const User = require('../models/User');

class UserDAO {
  
  // Método para buscar un usuario por su ID

  async getById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw new Error(`Error al buscar el usuario por ID: ${error.message}`);
    }
  }

  // Método para buscar un usuario por su email

  async getByEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (error) {
      throw new Error(`Error al buscar el usuario por email: ${error.message}`);
    }
  }

  // Método para crear un nuevo usuario

  async create(userData) {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  // Método para actualizar un usuario
  
  async update(id, updateData) {
    try {
      return await User.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }
}

module.exports = new UserDAO();