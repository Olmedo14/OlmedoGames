const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definimos el esquema del producto

const productSchema = new Schema({
  name: { type: String, required: true },        // Nombre del producto
  description: { type: String, required: true }, // Descripción del producto
  price: { type: Number, required: true },       // Precio del producto
  stock: { type: Number, required: true },       // Stock disponible
  category: { type: String, required: true },    // Categoría del producto
  imageUrl: { type: String },                    // URL de la imagen del producto
}, { timestamps: true }); // timestamps para createdAt y updatedAt

module.exports = mongoose.model('Product', productSchema);