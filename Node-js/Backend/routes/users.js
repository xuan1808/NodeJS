var express = require('express');
var router = express.Router();

const { register, login, verifyToken, getUser } = require('../controllers/userController');
const { verify } = require('jsonwebtoken');
// đăng ký
router.post('/register', register);
// Đăng nhập
router.post('/login',login);
// lay thong tin 1 user theo token 
router.get('/userinfo', verifyToken, getUser);
module.exports = router;
