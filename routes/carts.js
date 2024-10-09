const express = require('express');
const router = express.Router();
const CartDAO = require('../dao/CartDAO');
const ProductDAO = require('../dao/ProductDAO');
const Ticket = require('../models/Ticket');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');

// Finalizar compra (para usuarios)

router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await CartDAO.getById(cartId);

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        let totalAmount = 0;
        const productsToPurchase = [];
        const productsNotPurchased = [];

        for (const item of cart.items) {
            const product = await ProductDAO.getById(item.productId);

            if (!product) {
                productsNotPurchased.push(item);
                continue;
            }

            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await ProductDAO.update(product._id, product);
                productsToPurchase.push(item);
                totalAmount += product.price * item.quantity;
            } else {
                productsNotPurchased.push(item);
            }
        }

        const newTicket = new Ticket({
            code: uuidv4(),
            amount: totalAmount,
            purchaser: cart.userEmail
        });

        await newTicket.save();

        // Actualizar el carrito con los productos no comprados

        cart.items = productsNotPurchased;
        await CartDAO.update(cartId, cart);

        res.json({
            message: 'Compra realizada con éxito',
            ticket: newTicket,
            notPurchased: productsNotPurchased
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al finalizar la compra', error: error.message });
    }
});

module.exports = router;