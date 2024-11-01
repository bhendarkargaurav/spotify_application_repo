
const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/spotify_DB_Dev');
}

module.exports = connect;
