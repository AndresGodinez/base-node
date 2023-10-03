const express = require('express');
const router = express.Router();

const {index, createCategory} = require('../Controllers/CategoriesController');

router.post('/', createCategory);
router.get('/', index);

module.exports = router;
