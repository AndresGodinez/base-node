const express = require('express');
const router = express.Router();

const {login, logout, reload} = require(
    '../Controllers/AuthController');

router.post('/login', login);

router.post('/logout', logout);

router.post('/reload' , reload);

module.exports = router;
