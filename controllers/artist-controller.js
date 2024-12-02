// controllers/artistController.js
const artistService = require('../services/artist-service');

const createArtist = async (req, res) => {
    try {
        const artist = await artistService.createArtist(req.body);
        res.status(201).json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllArtists = async (req, res) => {
    try {
        const artists = await artistService.getAllArtists();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getArtistByid = async (req, res) => {
    try {
        const artist = await artistService.getArtistByid(req.params.id);
        res.status(200).json(artist);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateArtistById = async (req, res) => {
    try {
        const artist = await artistService.updateArtistById(req.params.id, req.body);
        res.status(200).json(artist);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteArtistById = async (req, res) => {
    try {
        await artistService.deleteArtistById(req.params.id);
        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createArtist,
    getAllArtists,
    getArtistByid,
    updateArtistById,
    deleteArtistById,
};
