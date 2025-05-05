const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String,
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  playlists: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Playlist' 
  }],

  otp: {            // Optional: to store generated OTP
    type: String 
  }, 
  otpExpiresAt: {   
    type: Date }, 

  refreshToken: { 
    type: String 
  }  
});

const User = mongoose.model('User', userSchema);
module.exports = User;



