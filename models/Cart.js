const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el esquema del carrito

const cartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' }, // Referencia a los productos
      quantity: { type: Number, required: true, default: 1 },   // Cantidad de cada producto
    },
  ],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Usuario al que pertenece el carrito
}, { timestamps: true }); // timestamps para createdAt y updatedAt

module.exports = mongoose.model('Cart', cartSchema);