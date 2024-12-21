const Otp = require('../models/otp');

class OTPRepository {
    // Method to create a new OTP
    async createOTP(email, otp){
        try {
            const otp = await Otp.create({ email, opt}) //te a new OTP record
            return otp;
        } catch (error) {
            console.error("Error creating OTP in the repository layer:", error);
            throw { error };
        }
    }

    // Method to find an OTP by email and OTP value
    async findOTP(email, otp) {
        try {
            return await Otp.findOne({ email, otp }).exec();
        } catch (error) {
            console.error("Error finding OTP in the repository layer:", error);
            throw { error };
        }
    }

}

module.exports = OTPRepository;
