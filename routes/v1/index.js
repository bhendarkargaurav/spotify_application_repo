// routes/v1/index.js
const express = require('express');
const router = express.Router();


const userController = require('../../controllers/user-controllers');
const songController = require('../../controllers/song-controller');


// User registration route(USER HANDLER)
router.post('/register', userController.createUser);
// User login route
router.post('/login', userController.login);
// Get user by ID route
router.get('/:id', userController.getUserById);
// Update user route
router.put('/:id', userController.updateUser);
// Delete user route
router.delete('/:id', userController.deleteUser);

// SONG MANAGMENT
router.post('/songs', songController.createSong); // Create a new song
router.get('/songs/:id', songController.getSong); // Get a song by ID
router.get('/songs', songController.listSongs); // List all songs
router.put('/songs/:id', songController.updateSong); // Update a song by ID
router.delete('/songs/:id', songController.deleteSong); // Delete a song by ID


module.exports = router;
