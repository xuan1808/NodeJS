var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('helo cac ban');
});
/* ADD users listing. */
router.get('/add', function(req, res, next) {
  res.send('them');
});
/* DELETE users listing. */
router.get('/delete', function(req, res, next) {
  res.send('xoa');
});
/* LOGIN users listing. */
router.get('/login', function(req, res, next) {
  res.send('dang nhap');
});
/* REGISTER users listing. */
router.get('/register', function(req, res, next) {
  res.send('dang ky');
});

module.exports = router;
