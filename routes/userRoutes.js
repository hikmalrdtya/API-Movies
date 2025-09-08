const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getAllUsers);

router.route('/:id')
.get(userController.getUserById)
.delete(userController.deleteUser)
.put(userController.editUser);

module.exports = router;