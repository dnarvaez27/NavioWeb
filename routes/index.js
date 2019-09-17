/* eslint-disable no-undef,no-unused-vars */
const express = require('express');
const router = express.Router({});

/* GET home page. */
router.get('/', function (req, res, next) {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(req => req.json())
    .then(data => console.log(data));
  res.send('App running...');
});

module.exports = router;
