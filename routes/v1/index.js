// routes/v1/index.js
const express = require('express');
const router = express.Router();


const userController = require('../../controllers/user-controllers');
const songController = require('../../controllers/song-controller');
const albumController = require('../../controllers/album-controller');
const playlistController = require('../../controllers/playlist-controller');


// User registration(USER HANDLER)
router.post('/register', userController.createUser);
router.post('/login', userController.login);       // User login route
router.get('/users/:id', userController.getUserById);     // Get user by ID route
router.put('/:id', userController.updateUser);    // Update user route
router.delete('/:id', userController.deleteUser);    // Delete user route

// SONG MANAGMENT
router.post('/songs', songController.createSong); // Create a new song
router.get('/songs/:id', songController.getSong); // Get a song by ID
router.get('/songs', songController.listSongs); // List all songs
router.put('/songs/:id', songController.updateSong); // Update a song by ID
router.delete('/songs/:id', songController.deleteSong); // Delete a song by ID

//Album Managment
router.post('/album', albumController.create);         // Create an album
router.get('/albums', albumController.getAllAlbum);         // Get all albums
// router.get('/album/:id', AlbumController.getAlbumById);      // Get album by ID
// router.put('/:id', AlbumController.updateAlbum);       // Update album by ID
// router.delete('/:id', AlbumController.deleteAlbum);    // Delete album by ID


//pyalist management
router.post('/crateplaylist', playlistController.createPlaylist);   // Create a playlist
router.get('/', playlistController.getAllPlaylists);    // Get all playlists
router.get('/:id', playlistController.getPlaylistById);   // Get a playlist by ID
router.put('/:id', playlistController.updatePlaylist);    // Update a playlist
router.delete('/:id', playlistController.deletePlaylist);   // Delete a playlist
router.post('/:playlistId/songs', playlistController.addSongToPlaylist);     // Add a song to a playlist
router.delete('/:playlistId/songs', playlistController.removeSongFromPlaylist);       // Remove a song from a playlist


module.exports = router;
