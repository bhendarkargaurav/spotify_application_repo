const Otp = require('../models/otp');

class OTPRepository {
    // Method to create a new OTP
    async createOTP(data){
        console.log(data);
        try {
            console.log('Data received in createOTP:', data); // Debugging log
            const otpDocument = new Otp(data);
            return await otpDocument.save(); // Save
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
