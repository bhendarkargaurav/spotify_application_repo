// routes/v1/index.js
const express = require('express');
const router = express.Router();


const userController = require('../../controllers/user-controllers');


// User registration route
router.post('/register', userController.createUser);
// User login route
router.post('/login', userController.login);
// Get user by ID route
router.get('/:id', userController.getUserById);
// Update user route
router.put('/:id', userController.updateUser);
// Delete user route
router.delete('/:id', userController.deleteUser);


module.exports = router;
