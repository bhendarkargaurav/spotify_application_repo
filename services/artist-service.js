// services/artistService.js
const artistRepository = require('../repository/artist-repository');

class ArtistService {

    async createArtist(artistData) {
        try {
            return await artistRepository.createArtist(artistData);
        } catch (error) {
            throw new Error(`Service error: ${error.message}`);
        }
    }

    async getAllArtists(filter) {
        try {
            return await artistRepository.getAllArtists(filter);
        } catch (error) {
            throw new Error(`Service error: ${error.message}`);
        }
    }

    async getArtistByid(id) {
        try {
            return await artistRepository.getArtistByid(id);
        } catch (error) {
            throw new Error(`Service error: ${error.message}`);
        }
    }

    async updateArtistById(id, updateData) {
        try {
            return await artistRepository.updateArtistById(id, updateData);
        } catch (error) {
            throw new Error(`Service error: ${error.message}`);
        }
    }

    async deleteArtistById(id) {
        try {
            return await artistRepository.deleteArtistById(id);
        } catch (error) {
            throw new Error(`Service error: ${error.message}`);
        }
    }
}

module.exports = new ArtistService();
