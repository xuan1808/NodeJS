const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: { type: String, required: true },
    description: { type: String },
}, { versionKey: false });

const products = mongoose.model('products', productSchema);

module.exports = products;