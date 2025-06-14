
const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect('mongodb+srv://Gaurav:Gaurav25Mongo@cluster0.gw6zgyd.mongodb.net/spotify_DB?retryWrites=true&w=majority&appName=Cluster0'); // database created if not pressend by same name
}

module.exports = connect;

