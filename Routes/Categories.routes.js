const express = require('express');
const router = express.Router();

const {index} = require('../Controllers/CategoriesController');

router.get('/', index);

module.exports = router;
