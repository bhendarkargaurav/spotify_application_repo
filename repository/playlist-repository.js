
const Playlist = require('../models/playlist');

class PlaylistRepository {
  /**
   * Create a new playlist
   * @param {Object} playlistData - Data for the new playlist
   * @returns {Promise<Object>} - Created playlist document
   */
  async createPlaylist(playlistData) {
    try {
      const playlist = new Playlist(playlistData);
      return await playlist.save();
    } catch (error) {
      throw new Error(`Error creating playlist: ${error.message}`);
    }
  }

  /**
   * Get all playlists
   * @param {Object} filter - Filter criteria for playlists
   * @returns {Promise<Array>} - List of playlists
   */
  async getPlaylists(filter = {}) {
    try {
      return await Playlist.find(filter).populate('user songs');
    } catch (error) {
      throw new Error(`Error retrieving playlists: ${error.message}`);
    }
  }

  /**
   * Get a single playlist by ID
   * @param {String} id - Playlist ID
   * @returns {Promise<Object>} - Playlist document
   */
  async getPlaylistById(id) {
    try {
      return await Playlist.findById(id).populate('user songs');
    } catch (error) {
      throw new Error(`Error retrieving playlist: ${error.message}`);
    }
  }

  /**
   * Update a playlist by ID
   * @param {String} id - Playlist ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} - Updated playlist document
   */
  async updatePlaylist(id, updateData) {
    try {
      return await Playlist.findByIdAndUpdate(id, updateData, { new: true }).populate('user songs');
    } catch (error) {
      throw new Error(`Error updating playlist: ${error.message}`);
    }
  }

  /**
   * Delete a playlist by ID
   * @param {String} id - Playlist ID
   * @returns {Promise<Object>} - Deleted playlist document
   */
  async deletePlaylist(id) {
    try {
      return await Playlist.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting playlist: ${error.message}`);
    }
  }

  /**
   * Add a song to a playlist
   * @param {String} playlistId - Playlist ID
   * @param {String} songId - Song ID
   * @returns {Promise<Object>} - Updated playlist document
   */
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

  /**
   * Remove a song from a playlist
   * @param {String} playlistId - Playlist ID
   * @param {String} songId - Song ID
   * @returns {Promise<Object>} - Updated playlist document
   */
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
