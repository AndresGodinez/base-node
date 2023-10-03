const express = require('express');
const router = express.Router();

const {createUser, listUsers, updateUser, deleteUser, whoAmI} = require(
    '../Controllers/UsersController');

router.post('/', createUser);

router.get('/', listUsers);

router.get('/me', whoAmI);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
