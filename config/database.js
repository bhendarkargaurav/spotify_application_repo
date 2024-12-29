
const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb://localhost/spotify_DB_Dev'); // database created if not pressend by same name
}

module.exports = connect;

