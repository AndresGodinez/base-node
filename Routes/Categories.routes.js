const express = require('express');
const router = express.Router();

const {index, createCategory,updateCategory} = require('../Controllers/CategoriesController');

router.post('/', createCategory);
router.get('/', index);
router.put('/:id', updateCategory);

module.exports = router;
