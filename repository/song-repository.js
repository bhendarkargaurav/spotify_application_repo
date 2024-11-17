const Song = require('../models/song');

class SongRepository {

    // method to create new song
    async createSong(songData) {
        try {
          const song = new Song(songData);
          return await song.save();
        } catch (error) {
          throw new Error(`Error creating song: ${error.message}`);
        }
      }
    
      // Fetch a song by ID
      async getSongById(songId) {
        try {
          return await Song.findById(songId).populate('artist album');
        } catch (error) {
          throw new Error(`Error fetching song by ID: ${error.message}`);
        }
      }
    
      // Fetch all songs with optional filters
      async getAllSongs(filters = {}) {
        try {
          return await Song.find(filters).populate('artist album');
        } catch (error) {
          throw new Error(`Error fetching songs: ${error.message}`);
        }
      }
    
      // Update a song by ID
      async updateSong(songId, updateData) {
        try {
          return await Song.findByIdAndUpdate(songId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators
          });
        } catch (error) {
          throw new Error(`Error updating song: ${error.message}`);
        }
      }
    
      // Delete a song by ID
      async deleteSong(songId) {
        try {
          return await Song.findByIdAndDelete(songId);
        } catch (error) {
          throw new Error(`Error deleting song: ${error.message}`);
        }
    }
}

module.exports = SongRepository;
