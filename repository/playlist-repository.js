
const Playlist = require('../models/playlist');

class PlaylistRepository {
  
  async createPlaylist(playlistData) {
    try {
      const playlist = new Playlist(playlistData);
      return await playlist.save();
    } catch (error) {
      throw new Error(`Error creating playlist: ${error.message}`);
    }
  }

  // get all playlists
  async getPlaylists(filter = {}) {
    try {
      return await Playlist.find(filter).populate('user songs');
    } catch (error) {
      throw new Error(`Error retrieving playlists: ${error.message}`);
    }
  }


  //Get a single playlist by ID
  async getPlaylistById(id) {
    try {
      return await Playlist.findById(id).populate('user songs');
    } catch (error) {
      throw new Error(`Error retrieving playlist: ${error.message}`);
    }
  }

  
   // Update a playlist by ID
   // id - Playlist ID
   // updateData - Data to update
  async updatePlaylist(id, updateData) {
    try {
      return await Playlist.findByIdAndUpdate(id, updateData, { new: true }).populate('user songs');
    } catch (error) {
      throw new Error(`Error updating playlist: ${error.message}`);
    }
  }

  
   // Delete a playlist by ID
   // id - Playlist ID
  async deletePlaylist(id) {
    try {
      return await Playlist.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting playlist: ${error.message}`);
    }
  }

  
  // Add a song to a playlist
  // playlistId - Playlist ID
  // songId - Song ID
  async addSongToPlaylist(playlistId, songId) {
    try {
      return await Playlist.findByIdAndUpdate(
        playlistId,
        { $addToSet: { songs: songId } },
        { new: true }
      ).populate('user songs');
    } catch (error) {
      throw new Error(`Error adding song to playlist: ${error.message}`);
    }
  }

  
  // Remove a song from a playlist
  // playlistId - Playlist ID
  // songId - Song ID
  async removeSongFromPlaylist(playlistId, songId) {
    try {
      return await Playlist.findByIdAndUpdate(
        playlistId,
        { $pull: { songs: songId } },
        { new: true }
      ).populate('user songs');
    } catch (error) {
      throw new Error(`Error removing song from playlist: ${error.message}`);
    }
  }
}

module.exports = new PlaylistRepository();






