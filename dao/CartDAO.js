const Cart = require('../models/Cart');

class CartDAO {

  // Método para obtener un carrito por su ID

  async findById(id) {
    try {
      return await Cart.findById(id).populate('products.product');
    } catch (error) {
      throw new Error('Error al buscar el carrito por ID');
    }
  }

  // Método para agregar un producto al carrito

  async addProduct(cartId, product) {
    try {
      return await Cart.findByIdAndUpdate(
        cartId,
        { $push: { products: product } },
        { new: true }
      );
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }

  // Método para actualizar un carrito
  
  async updateCart(cartId, updateData) {
    try {
      return await Cart.findByIdAndUpdate(cartId, updateData, { new: true });
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }
}

module.exports = new CartDAO();