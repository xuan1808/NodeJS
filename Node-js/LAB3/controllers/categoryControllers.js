const categories = require('../models/categoryModels');
const getAllCategories = async(req, res, next) => {
    try {
        //hàm find là hàm lấy tất cả  các doccument 
        const arr = await categories.find();
        res.status(200).json(arr);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

const getCategoryById = async(req, res, next) => {
    try {
          //hàm findById  là hàm lấy 1  doccument dựa vào Id
        const arr = await categories.findById(req.params.id);
        res.status(200).json(arr);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
//them dm 
const addCate = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Kiểm tra dữ liệu nhận được từ frontend

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Tên danh mục không được để trống!" });
        }

        // Kiểm tra xem danh mục đã tồn tại chưa
        const existingCategory = await categories.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: "Danh mục đã tồn tại!" });
        }

        const newCategory = new categories({ name });
        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Lỗi server:", error);
        res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau!" });
    }
};

  
  //sua
  const editCate = async (req, res) =>{
    try{
      const category= req.body;
      
      const data = await categories.findByIdAndUpdate(
        req.params.id, category, {new: true} );
        res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json( {message: error.message});
    }
  }
  
  // xoa
  const deleteCate = async (req, res) =>{
    try{
      const data = await categories.findByIdAndDelete(req.params.id);
      res.json({ message: 'Xoa thanh cong'});
    }catch (error){
      console.error(error);
      res.status(500).json({message: error.message});
    }
  }
module.exports = {
    getAllCategories,
    getCategoryById,
    addCate,
    editCate,
    deleteCate
};