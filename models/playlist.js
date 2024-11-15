const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }, // Owner of the playlist
    songs: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Song' 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    isPublic: { 
        type: Boolean, 
        default: false 
    } // If the playlist is visible to others
})

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
