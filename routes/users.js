/* eslint-disable no-undef,no-unused-vars */
const express = require('express');
const router = express.Router();
const { execQuery, functions } = require('../db');

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    const users = await execQuery(functions.get, 'users', {});
    res.send(users);
  })();
});

module.exports = router;
