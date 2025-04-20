var express = require('express');
var router = express.Router();
//Tạo cấu trúc thư mục shcema cho collection categories
const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name:{ type: String, require:true},
    img: {type: String,  require: true},
});
//tạo model từ schema treen collection categories
const categories = mongoose.model('categories', categorySchema);
// API lấy danh mục
router.get('/', async(req,res)=>{
    try {
        const arr= await categories.find();
        console.log(arr);
         // hàm find lấy tất cả dữ liệu
        res.status(200).json(arr);   
    }catch (error){
        res.status(500).json({ message: error.message});
    }
    
});
// api lấy chi tiết danh mục từ id 
router.get('/:id', async(red, res) => {
    try {
        const category = await categories.findById(red.params.id);
        //hàm finbyId lấy dữ liệu theo id 
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;