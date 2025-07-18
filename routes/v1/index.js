// routes/v1/index.js
const express = require('express');
const router = express.Router();

const { uploadAudio, getSongByName } = require('../../controllers/audio-controller.js');
const { audioUpload } = require('../../middleware/multerMiddleware.js');


const userController = require('../../controllers/user-controllers');
const songController = require('../../controllers/song-controller');
const albumController = require('../../controllers/album-controller');
const playlistController = require('../../controllers/playlist-controller');
const artistController = require('../../controllers/artist-controller');
const otpController = require('../../controllers/otp-controller');


// User registration(USER HANDLER)
router.post('/register', userController.createUser);
router.post('/login', userController.login);       // User login route
router.post('/refreshAccessToken', userController.refreshAccessToken);
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


//plyalist management
router.post('/crateplaylist', playlistController.createPlaylist);   // Create a playlist
router.get('/getallplaylist', playlistController.getAllPlaylists);    // Get all playlists
router.get('/playlist/:id', playlistController.getPlaylistById);   // Get a playlist by ID
router.put('/playlist/:id', playlistController.updatePlaylist);    // Update a playlist
router.delete('/playlist/:id', playlistController.deletePlaylist);   // Delete a playlist
router.post('/playlist/:playlistId/songs', playlistController.addSongToPlaylist);     // Add a song to a playlist
router.delete('/playlist/:playlistId/songs', playlistController.removeSongFromPlaylist);       // Remove a song from a playlist


// Artist Management
router.post('/createartist', artistController.createArtist);
router.get('/getallartist', artistController.getAllArtists);
router.get('/artist/:id', artistController.getArtistByid);
router.put('/artist/:id', artistController.updateArtistById);
router.delete('/artist/:id', artistController.deleteArtistById);


// Route to generate an OTP and verify an OTP
router.post('/generateotp', otpController.generateOTP);
router.post('/verify', otpController.verifyOTP);


router.post('/upload-audio', audioUpload.single('audioFile'), uploadAudio);
router.get('/playsong', getSongByName)
module.exports = router;
