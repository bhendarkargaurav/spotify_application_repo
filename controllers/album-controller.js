
const AlbumService = require('../services/album-service');

class AlbumController {
  /**
   * Create a new album
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createAlbum(req, res) {
    try {
      const albumData = req.body;
      const createdAlbum = await AlbumService.createAlbum(albumData);
      res.status(201).json(createdAlbum);
    } catch (error) {
      res.status(500).json({ error: `Failed to create album: ${error.message}` });
    }
  }

  /**
   * Get all albums
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllAlbums(req, res) {
    try {
      const albums = await AlbumService.getAllAlbums();
      res.status(200).json(albums);
    } catch (error) {
      res.status(500).json({ error: `Failed to fetch albums: ${error.message}` });
    }
  }

  /**
   * Get an album by its ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAlbumById(req, res) {
    try {
      const albumId = req.params.id;
      const album = await AlbumService.getAlbumById(albumId);
      res.status(200).json(album);
    } catch (error) {
      res.status(404).json({ error: `Failed to fetch album by ID: ${error.message}` });
    }
  }

  /**
   * Update an album by its ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateAlbum(req, res) {
    try {
      const albumId = req.params.id;
      const updateData = req.body;
      const updatedAlbum = await AlbumService.updateAlbum(albumId, updateData);
      res.status(200).json(updatedAlbum);
    } catch (error) {
      res.status(404).json({ error: `Failed to update album: ${error.message}` });
    }
  }

  /**
   * Delete an album by its ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteAlbum(req, res) {
    try {
      const albumId = req.params.id;
      const deletedAlbum = await AlbumService.deleteAlbum(albumId);
      res.status(200).json(deletedAlbum);
    } catch (error) {
      res.status(404).json({ error: `Failed to delete album: ${error.message}` });
    }
  }
}

module.exports = new AlbumController();
