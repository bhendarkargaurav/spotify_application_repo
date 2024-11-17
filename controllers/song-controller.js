const SongService = require('../services/song-service');
const songService = new SongService();

// class SongController {
  // Create a new song
  const createSong = async (req, res) => {
    try {
      const songData = req.body; // Extract song details from the request body
      const song = await songService.addSong(songData);
      res.status(201).json({
        success: true,
        message: 'Song created successfully',
        data: song,
      });
      return song;
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get a single song by ID
  const getSong = async (req, res) => {
    try {
      const songId = req.params.id; // Extract song ID from the route parameters
      const song = await songService.getSong(songId);
      res.status(200).json({
        success: true,
        message: 'Song retrieved successfully',
        data: song,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Get all songs with optional filters
  const listSongs = async (req, res) => {
    try {
      const filters = req.query; // Extract filters from the query parameters
      const songs = await songService.listSongs(filters);
      res.status(200).json({
        success: true,
        message: 'Songs retrieved successfully',
        data: songs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Update a song by ID
  const updateSong = async (req, res) => {
    try {
      const songId = req.params.id; // Extract song ID from the route parameters
      const updateData = req.body; // Extract update data from the request body
      const updatedSong = await songService.editSong(songId, updateData);
      res.status(200).json({
        success: true,
        message: 'Song updated successfully',
        data: updatedSong,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Delete a song by ID
  const deleteSong = async (req, res) => {
    try {
      const songId = req.params.id; // Extract song ID from the route parameters
      const deletedSong = await songService.removeSong(songId);
      res.status(200).json({
        success: true,
        message: 'Song deleted successfully',
        data: deletedSong,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
// }

module.exports = {
  createSong,
  getSong,
  listSongs,
  updateSong,
  deleteSong
}
