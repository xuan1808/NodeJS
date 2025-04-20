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
const upload = multer({storage: storage, fileFilter: checkfile});

const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//đăng ký
const register = [ upload.single('image'), async (req, res) => {
    console.log(req.body);
  try {
    
      //kieemr tra emial đã tồn tại hya ch
      const checkUser = await userModel.findOne({
        email: req.body.email
      });
      if (checkUser) {
        throw new Error('Eamil đã tồn tại');
      }
      // Mã hóa mật khẩu bằng bcrypt
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      // tạo một instance mới cảu userMOddle

     const newUser = new userModel({
        email: req.body.email,
        password: hashPassword
     });
     // luue vào đatabase
     const data = await newUser.save();
     res.json(data);
  }
  catch (error) {
    res.status(500).json({ message: error.message});
    
  }
}
]
// đăng nhập
const login = async (req, res) => {
  try {
    // Kiểm tra email có tồn tại không
    const checkUser = await userModel.findOne({ email: req.body.email });
    if (!checkUser) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(req.body.password, checkUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Tạo token chứa cả id và role
    const token = jwt.sign(
      { id: checkUser._id, role: checkUser.role }, // Sử dụng role từ database
      'hianhem',
      { expiresIn: '1h' }
    );
   

    res.json({ token, role: checkUser.role });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
 
};




//Bao mat token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Không có token hoặc token không hợp lệ' });
  }

  const token = authHeader.split(' ')[1]; // Lấy token từ "Bearer TOKEN"
  
  jwt.verify(token, 'hianhem', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
    
    req.userId = decoded.id;
    req.userRole = decoded.role; // Lưu role vào request để sử dụng sau
    next();
  });
};

//lay thog tin usser khi co token 
const getUser = async (req, res) => {
  try { 
    const user = await userModel.findById(req.userId, { password: 1, email:1});
    if (!user) {
      throw new Error('ko tim thay user');
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message : error.message
    });
  }
}
// xac thuc admin 
const verifyAdmin = async (req, res, next) => {
  try{
    // lay thong tin users tu id luu trong req khi da xac thuc token
    const user = await userModel.findById(req.userId);
    if (!user) {
      throw new Error('ko tim thay user');
    }
    if (user.role !== 'admin') {
      throw new Error('Ko co quyen truy cap ');
    }
    next();
  }catch (error) {
    res.status(500).json({ message: error.message});
  }
}
 

module.exports = {
    register,
    login,
    verifyToken,
    getUser,
    verifyAdmin
};






