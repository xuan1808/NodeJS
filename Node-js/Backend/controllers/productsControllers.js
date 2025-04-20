//chèn multer để upload file
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})
const checkfile = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
    return cb(new Error('Bạn chỉ được upload file ảnh'))
  }
  return cb(null, true)
}
const upload = multer({storage: storage, fileFilter: checkfile})

const products = require('../models/productModels');
const categories = require('../models/categoryModels');

const getAllproducts = async (req, res) => {
    try {
        const { name, idcate, limit, sort, page, hot } = req.query;
        let query = {}; // Query chứa điều kiện tìm kiếm
        let options = {}; // Các tùy chọn gồm limit và sort,...
    
        if (name) { // Tìm kiếm theo tên sản phẩm
          query.name = new RegExp(name, 'i');
        }
        if (hot) { // Tìm sản phẩm hot
          query.hot = parseInt(hot);
        }
    
        if (idcate) { // Tìm kiếm theo ID danh mục
          query.categoryId = idcate;
        }
    
        if (limit) { // Giới hạn số lượng sản phẩm trả về
          options.limit = parseInt(limit);
        }
    
        if (sort) { // Sắp xếp theo giá
          options.sort = { price: sort === 'asc' ? 1 : -1 };
          // 'asc' cho sắp xếp tăng dần, 'desc' cho giảm dần
        }
    
        if (page) { // Phân trang
          options.skip = (parseInt(page) - 1) * options.limit;
        }
    
        const arr = await products.find(query, null, options).populate('categoryId', 'name');
        
        res.json(arr);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }

};

const getproductsById = async (req, res, next) => {
    try {
        const product = await products.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//thêm sp có chekc id danh mục có tồn tại  ko và upload ảnh 
const addPro = [ upload.single('image'), async (req, res) => {
  try {
      // lấy dữ lieuj từ body 
      const product = req.body;
      // lấy tên file ảnh rừ red.file
      product.image = req.file.originalname;
      console.log(product);
      // 
      const newProduct = new products(product);
      //tạo một instance mới của products Model
      const category = await categories.findById(product.categoryId);
      if (!category) {
        throw new Error('Danh mục không tồn tại');
      }
      // lưu san phẩm vào dâtbase
      const data = await newProduct.save();
      res.json(data);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message});
    
  }
}
]
//sua sp
const editPro = [upload.single('image'), async (req, res) =>{
  try{
    const product = req.body;
    if(req.file){
      product.image = req.file.originalname;
    }
    const data = await products.findByIdAndUpdate(
      req.params.id, product, {new: true} );
      res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json( {message: error.message});
  }
}
]
//xoa pro
const deletePro = async (req, res) =>{
  try{
    const data = await products.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoa thanh cong'});
  }catch (error){
    console.error(error);
    res.status(500).json({message: error.message});
  }
}

module.exports = {
    getAllproducts,
    getproductsById,
    addPro,
    editPro,
    deletePro
};




