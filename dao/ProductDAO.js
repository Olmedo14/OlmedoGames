const Product = require('../models/Product');

class ProductDAO {

  // Método para obtener un producto por su ID

  async findById(id) {
    try {
      return await Product.findById(id);
    } catch (error) {
      throw new Error('Error al buscar el producto por ID');
    }
  }

  // Método para actualizar el stock de un producto

  async updateStock(id, quantity) {
    try {
      return await Product.findByIdAndUpdate(id, { $inc: { stock: -quantity } }, { new: true });
    } catch (error) {
      throw new Error('Error al actualizar el stock del producto');
    }
  }

  // Método para obtener todos los productos

  async findAll() {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }
}

module.exports = new ProductDAO();