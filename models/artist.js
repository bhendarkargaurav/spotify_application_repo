const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true,
        },
        bio: {
          type: String,
          trim: true,
        },
        profileImageUrl: {
          type: String,
        },
        socialLinks: {
          type: [String], // Array of URLs for social media or websites
          default: [],
        },
      });
      
const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;