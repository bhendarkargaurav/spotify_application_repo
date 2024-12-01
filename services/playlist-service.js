const playlistRepository = require('../repository/playlist-repository');

class PlaylistService {
  async createPlaylist(data) {
    return await playlistRepository.createPlaylist(data);
  }

  async getAllPlaylists(filter) {
    return await playlistRepository.getPlaylists(filter);
  }

  async getPlaylistById(id) {
    return await playlistRepository.getPlaylistById(id);
  }

  async updatePlaylist(id, updateData) {
    return await playlistRepository.updatePlaylist(id, updateData);
  }

  async deletePlaylist(id) {
    return await playlistRepository.deletePlaylist(id);
  }

  async addSongToPlaylist(playlistId, songId) {
    return await playlistRepository.addSongToPlaylist(playlistId, songId);
  }

  async removeSongFromPlaylist(playlistId, songId) {
    return await playlistRepository.removeSongFromPlaylist(playlistId, songId);
  }
}

module.exports = new PlaylistService();
