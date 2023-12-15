const express = require('express');
const router = express.Router();
const {createCost, updateCost, deleteCost, indexCost} = require('../Controllers/CostsController');

router.post('/', createCost);
router.put('/:id', updateCost);
router.delete('/:id', deleteCost);
router.get('/', indexCost);

module.exports = router;
