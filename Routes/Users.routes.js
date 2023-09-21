const express = require('express');
const router = express.Router();

const {createUser, listUsers, updateUser, deleteUser} = require(
    '../Controllers/UsersController');

router.post('/', createUser);

router.get('/', listUsers);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
