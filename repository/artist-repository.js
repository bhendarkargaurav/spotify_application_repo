
const Artist = require('../models/artist');

class ArtistRepository {

    async createArtist(artistData){
        try {
            const artist = new Artist(artistData);
            return await artist.save();
        } catch (error) {
            throw new Error(`Error creating artist: ${error.message}`);
        }
    }


// get all Artist
    async getAllArtists(filter = {}) {
        try {
            return await Artist.find(filter);
        } catch (error) {
            throw new Error(`Error fetching artists: ${error.message}`);
        }
    }

    // get artist by id
async getArtistByid(id) {
    try {
        const artist = await Artist.findById(id);
        if (!artist) {
            throw new Error(`Artist with ID ${id} not found`);
        }
        return artist;
    } catch (error) {
        throw new Error(`Error retrieving playlist: ${error.message}`);
    }
}

async updateArtistById(id, updateData) {
    try {
        const artist = await Artist.findByIdAndUpdate(id, updateData, { new: true });
        if (!artist) {
            throw new Error(`Artist with ID ${id} not found`);
        }
        return artist;
    } catch (error) {
        throw new Error(`Error updating artist: ${error.message}`);
    }
}

async deleteArtistById(id) {
    try {
        const artist = await Artist.findByIdAndDelete(id);
        if (!artist) {
            throw new Error(`Artist with ID ${id} not found`);
        }
        return artist;
    } catch (error) {
        throw new Error(`Error deleting artist: ${error.message}`);
    }
}
}

module.exports = new ArtistRepository();