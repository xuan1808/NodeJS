var express = require('express');
var router = express.Router();

const { getAllCategories,
    getCategoryById, 
    addCate,
    editCate,
    deleteCate
} = require('../controllers/categoryControllers');
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/' ,addCate);
// sua sp
router.patch('/:id', editCate);
//xoa
router.delete('/:id', deleteCate);

module.exports = router;
