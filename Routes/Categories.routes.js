const express = require('express');
const router = express.Router();
const AuthMiddleware = require("../Middlewares/AuthMiddleware")
const {index, createCategory,updateCategory, deleteCategory, totalCategories} = require('../Controllers/CategoriesController');

router.post('/', createCategory);
router.get('/', index);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

//Features
router.get('/total', totalCategories);

module.exports = router;
