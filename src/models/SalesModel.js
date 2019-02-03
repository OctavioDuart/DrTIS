const mongoose = require('../database/connection');

const model = new mongoose.Schema({
    cpf_client: { type: String, required: true, trim: true },
    products: [
        { quantity: Number, name: String }
    ]
});

module.exports = mongoose.model('Sales', model);