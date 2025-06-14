const mongoose = require('mongoose');
require('../models/artist');
require('../models/album');

const songSchema = new mongoose.Schema({
  title: { 
    type: String,
    // required: true 
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    
  },
  album: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Album',                          
  },
  duration: {        // Duration in seconds
    type: Number, 
    // required: true 
  }, 
  genre: { 
    type: String 
  },
  cloudinaryUrl: { 
    type: String, 
    required: true 
  },

}, {timestamps: true});

const Song = mongoose.model('Song', songSchema);
module.exports = Song;