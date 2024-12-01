const playlistService = require('../services/playlist-service');

class PlaylistController {
  async createPlaylist(req, res) {
    try {
      const playlist = await playlistService.createPlaylist(req.body);
      res.status(201).json(playlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllPlaylists(req, res) {
    try {
      const playlists = await playlistService.getAllPlaylists(req.query);
      res.status(200).json(playlists);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPlaylistById(req, res) {
    try {
      const playlist = await playlistService.getPlaylistById(req.params.id);
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      res.status(200).json(playlist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePlaylist(req, res) {
    try {
      const updatedPlaylist = await playlistService.updatePlaylist(req.params.id, req.body);
      if (!updatedPlaylist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      res.status(200).json(updatedPlaylist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deletePlaylist(req, res) {
    try {
      const deletedPlaylist = await playlistService.deletePlaylist(req.params.id);
      if (!deletedPlaylist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addSongToPlaylist(req, res) {
    try {
      const updatedPlaylist = await playlistService.addSongToPlaylist(req.params.playlistId, req.body.songId);
      res.status(200).json(updatedPlaylist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async removeSongFromPlaylist(req, res) {
    try {
      const updatedPlaylist = await playlistService.removeSongFromPlaylist(req.params.playlistId, req.body.songId);
      res.status(200).json(updatedPlaylist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PlaylistController();
