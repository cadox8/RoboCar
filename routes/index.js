const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log(data);
  res.render('index', { title: 'Coche To Flama', data: data});
});

module.exports = router;
