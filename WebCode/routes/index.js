const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  console.log(sensorData);
  res.render('index', { title: 'Coche To Flama', data: sensorData});
});

module.exports = router;
