var express = require('express');
var router = express.Router();


const { getAllproducts, getproductsById, addPro, editPro, deletePro} = require('../controllers/productsControllers');
const {verifyToken,verifyAdmin } = require('../controllers/userController');
// them sản phẩm 
router.post('/', verifyToken,verifyAdmin ,addPro);
// laays tat ca sp
router.get('/', getAllproducts);
// lay chi tiet
router.get('/:id', getproductsById);
// sua sp
router.patch('/:id', verifyToken,verifyAdmin,editPro);
//xoa
router.delete('/:id', verifyToken,verifyAdmin, deletePro);


module.exports = router;