const express = require('express');
const router = express.Router();

const {createUser, listUsers} = require('../Controllers/UsersController');

router.post('/', createUser);

router.get('/', listUsers);

module.exports = router;
