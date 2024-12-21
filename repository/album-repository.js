const Album = require('../models/album');

class AlbumRepository {
  // Method to create a new album
  async create(albumData) {
    console.log("album repo", albumData);
    try {
      const album = new Album(albumData);
      return await album.save();
    } catch (error) {
      throw new Error(`Error creating album: ${error.message}`);
    }
  }

  // Fetch an album by ID
  async getAlbumById(albumId) {
    try {
      const album = await Album.findById(albumId)
        .populate('artist') // Populate artist reference
        .populate('songs'); // Populate songs reference
      if (!album) {
        throw new Error('Album not found');
      }
      return album;
    } catch (error) {
      throw new Error(`Error fetching album by ID: ${error.message}`);
    }
  }

  // Fetch all albums with optional filters
  async getAllAlbums(filters = {}) {
    try {
      return await Album.find(filters)
        .populate('artist') // Populate artist reference
        .populate('songs'); // Populate songs reference
    } catch (error) {
      throw new Error(`Error fetching albums: ${error.message}`);
    }
  }

  // Update an album by ID
  async updateAlbum(albumId, updateData) {
    try {
      const updatedAlbum = await Album.findByIdAndUpdate(albumId, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }).populate('artist').populate('songs');
      if (!updatedAlbum) {
        throw new Error('Album not found');
      }
      return updatedAlbum;
    } catch (error) {
      throw new Error(`Error updating album: ${error.message}`);
    }
  }

  // Delete an album by ID
  async deleteAlbum(albumId) {
    try {
      const deletedAlbum = await Album.findByIdAndDelete(albumId);
      if (!deletedAlbum) {
        throw new Error('Album not found');
      }
      return deletedAlbum;
    } catch (error) {
      throw new Error(`Error deleting album: ${error.message}`);
    }
  }
}

module.exports = AlbumRepository;
