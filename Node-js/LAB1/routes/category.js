var express = require('express');
var router = express.Router();
const categories = [
    { id: 1, name: "category 1", img: "ao1.webp"},
    { id: 2, name: "category 2", img: "ao2.webp"},
    { id: 3, name: "category 3", img: "ao3.webp"},
    ];

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('category', { data: categories });
  });
  
  module.exports = router;
