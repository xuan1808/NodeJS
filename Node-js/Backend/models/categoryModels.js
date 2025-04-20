const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true }
});

// Đặt tên model là 'Category' (viết hoa, số ít)
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
