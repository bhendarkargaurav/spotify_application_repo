const Album = require('../models/album');

class AlbumRepository {
  /**
   * Create a new album
   * @param {Object} albumData - Data for the new album
   * @returns {Object} Created album document
   */
  async createAlbum(albumData) {
    try {
      const album = new Album(albumData);
      return await album.save();
    } catch (error) {
      throw new Error(`Error creating album: ${error.message}`);
    }
  }

  /**
   * Get all albums
   * @returns {Array} List of all albums
   */
  async getAllAlbums() {
    try {
      return await Album.find()
        .populate('artist') // Populates artist reference (if ObjectId)
        .populate('songs'); // Populates songs reference
    } catch (error) {
      throw new Error(`Error fetching albums: ${error.message}`);
    }
  }

  /**
   * Get an album by its ID
   * @param {String} albumId - ID of the album
   * @returns {Object} Album document or null if not found
   */
  async getAlbumById(albumId) {
    try {
      const album = await Album.findById(albumId)
        .populate('artist')
        .populate('songs');
      if (!album) {
        throw new Error(`Album with ID ${albumId} not found`);
      }
      return album;
    } catch (error) {
      throw new Error(`Error fetching album with ID ${albumId}: ${error.message}`);
    }
  }

  /**
   * Update an album by its ID
   * @param {String} albumId - ID of the album
   * @param {Object} updateData - Data to update
   * @returns {Object} Updated album document or error if not found
   */
  async updateAlbum(albumId, updateData) {
    try {
      const updatedAlbum = await Album.findByIdAndUpdate(albumId, updateData, {
        new: true, // Returns the updated document
      }).populate('artist').populate('songs');
      if (!updatedAlbum) {
        throw new Error(`Album with ID ${albumId} not found`);
      }
      return updatedAlbum;
    } catch (error) {
      throw new Error(`Error updating album with ID ${albumId}: ${error.message}`);
    }
  }

  /**
   * Delete an album by its ID
   * @param {String} albumId - ID of the album
   * @returns {Object} Deleted album document or error if not found
   */
  async deleteAlbum(albumId) {
    try {
      const deletedAlbum = await Album.findByIdAndDelete(albumId);
      if (!deletedAlbum) {
        throw new Error(`Album with ID ${albumId} not found`);
      }
      return deletedAlbum;
    } catch (error) {
      throw new Error(`Error deleting album with ID ${albumId}: ${error.message}`);
    }
  }
}

module.exports = new AlbumRepository();
