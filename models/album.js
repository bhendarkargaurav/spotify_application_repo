const mongoose = require('mongoose');
require('../models/song');

const albumSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true 
  },
  artist: { 
    // type: String,
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Artist', 
  },
  releaseDate: { 
    type: Date 
  },
  genre: { 
    type: String 
  },
  songs: [{ 
    // type: String ,
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Song' 
  }]
});

const Album = mongoose.model('Album', albumSchema);
module.exports = Album;