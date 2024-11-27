const AlbumRepository = require('../repository/album-repository');

class AlbumService {
  /**
   * Create a new album
   * @param {Object} albumData - Data for the new album
   * @returns {Object} Created album document
   */
  async createAlbum(albumData) {
    try {
      return await AlbumRepository.createAlbum(albumData);
    } catch (error) {
      throw new Error(`AlbumService: Failed to create album. ${error.message}`);
    }
  }

  /**
   * Get all albums
   * @returns {Array} List of all albums
   */
  async getAllAlbums() {
    try {
      return await AlbumRepository.getAllAlbums();
    } catch (error) {
      throw new Error(`AlbumService: Failed to fetch albums. ${error.message}`);
    }
  }

  /**
   * Get an album by its ID
   * @param {String} albumId - Album ID
   * @returns {Object} Album document
   */
  async getAlbumById(albumId) {
    try {
      return await AlbumRepository.getAlbumById(albumId);
    } catch (error) {
      throw new Error(`AlbumService: Failed to fetch album by ID. ${error.message}`);
    }
  }

  /**
   * Update an album by its ID
   * @param {String} albumId - Album ID
   * @param {Object} updateData - Data to update
   * @returns {Object} Updated album document
   */
  async updateAlbum(albumId, updateData) {
    try {
      return await AlbumRepository.updateAlbum(albumId, updateData);
    } catch (error) {
      throw new Error(`AlbumService: Failed to update album. ${error.message}`);
    }
  }

  /**
   * Delete an album by its ID
   * @param {String} albumId - Album ID
   * @returns {Object} Deleted album document
   */
  async deleteAlbum(albumId) {
    try {
      return await AlbumRepository.deleteAlbum(albumId);
    } catch (error) {
      throw new Error(`AlbumService: Failed to delete album. ${error.message}`);
    }
  }
}

module.exports = new AlbumService();
