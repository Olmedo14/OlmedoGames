const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const TicketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4 // Genera un código único automáticamente
    },
    purchase_datetime: {
        type: Date,
        default: Date.now // Guarda la fecha y hora actual
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);