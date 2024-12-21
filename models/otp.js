
const mongoose = require('mongoose');

    const otpSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        otp: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: '5m' // Automatically deletes the document after 5 minutes
        }
});

const Otp = mongoose.model('Otp', otpSchema);
module.exports = Otp;