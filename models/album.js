const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true 
  },
  artist: { 
    type: String,
    // type: mongoose.Schema.Types.ObjectId, 
    ref: 'Artist', 
    required: true 
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