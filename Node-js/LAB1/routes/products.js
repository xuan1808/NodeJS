var express = require('express');
var router = express.Router();
const products = [
    { id: 1, name: "product 1", price: 100, categoryId: 1,img: "ao1.webp", description: "Description 1"},
    { id: 2, name: "product 2", price: 200, categoryId: 2,img: "ao2.webp", description: "Description 2"},
    { id: 3, name: "product 3", price: 300, categoryId: 3,img: "ao3.webp", description: "Description 3"},
    { id: 4, name: "product 4", price: 400, categoryId: 1,img: "ao4.webp", description: "Description 4"},
    { id: 5, name: "product 5", price: 500, categoryId: 2,img: "ao5.webp", description: "Description 5"},
    { id: 6, name: "product 6", price: 600, categoryId: 3,img: "ao9.webp", description: "Description 6"},
  ];
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('productpage', { data: products });
  });
  
  module.exports = router;