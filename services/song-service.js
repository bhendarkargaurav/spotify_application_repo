const SongRepository = require('../repository/song-repository');

class SongService {
  constructor() {
    this.songRepository = new SongRepository();
  }

  async addSong(songData) {
    try {
      return await this.songRepository.createSong(songData);
    } catch (error) {
      // Log the error if needed
      throw new Error(`Error in addSong: ${error.message}`);
    }
  }

  async getSong(songId) {
    try {
      console.log("service songId is ", songId);
      const song = await this.songRepository.getSongById(songId);
      return song;
      // if (!song) {
      //   throw new Error(`Song with ID ${songId} not found`);
      // }
      // return song;
    } catch (error) {
      throw new Error(`Error in getSong: ${error.message}`);
    }
  }

  async listSongs(filters) {
    try {
      return await songRepository.getAllSongs(filters);
    } catch (error) {
      throw new Error(`Error in listSongs: ${error.message}`);
    }
  }

  async editSong(songId, updateData) {
    try {
      const updatedSong = await songRepository.updateSong(songId, updateData);
      if (!updatedSong) {
        throw new Error(`Song with ID ${songId} not found for update`);
      }
      return updatedSong;
    } catch (error) {
      throw new Error(`Error in editSong: ${error.message}`);
    }
  }

  async removeSong(songId) {
    try {
      const deletedSong = await songRepository.deleteSong(songId);
      if (!deletedSong) {
        throw new Error(`Song with ID ${songId} not found for deletion`);
      }
      return deletedSong;
    } catch (error) {
      throw new Error(`Error in removeSong: ${error.message}`);
    }
  }
}

module.exports = SongService;
