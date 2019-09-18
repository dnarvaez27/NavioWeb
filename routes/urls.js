/* eslint-disable no-undef,no-unused-vars */
const express = require('express');
const router = express.Router();
const { execQuery, functions } = require('../db');

/* GET users listing. */
router.get('/', (req, res, next) => {
  (async () => {
    const users = await execQuery(functions.get, 'urls', {});
    res.send(users);
  })();
});

router.post('/', (req, res) => {
  (async () => {
    const obj = req.body;
    await execQuery(functions.createOne, 'urls', obj);
    res.send({ status: 'ok' });
  })();
});

module.exports = router;
