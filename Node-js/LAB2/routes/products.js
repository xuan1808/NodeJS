var express = require('express');
var router = express.Router();
//Tạo cấu trúc thư mục shcema cho collection categories
const mongoose = require('mongoose');
const productsSchema = new mongoose.Schema({
    name:{ type: String, require:true},
    price: {type: Number,  require: true},
    categoryId:{type: mongoose.Schema. Types.ObjectId, ref: 'categories'},
    image: {type: String, require: true },
    description: {type: String},

},{versionKey: false});
//tạo model từ schema treen collection proucts
const products = mongoose.model('products', productsSchema);
// API lấy products
router.get('/', async(req,res)=>{
  try {
      const arr= await products.find();
      console.log(arr);
       // hàm find lấy tất cả dữ liệu
      res.status(200).json(arr);   
  }catch (error){
      res.status(500).json({ message: error.message});
  }
  
});
// api lấy chi tiết danh product id 
router.get('/:id', async(red, res) => {
  try {
      const product = await products.findById(red.params.id);
      //hàm finbyId lấy dữ liệu theo id 
      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;