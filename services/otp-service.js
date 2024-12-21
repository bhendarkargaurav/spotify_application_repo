const otpGenerator = require('otp-generator');
const OTPRepository = require('../repository/otp-repository');
const { sendEmail } = require('../config/email');

class OTPService {
    constructor() {
        this.otpRepository = new OTPRepository();
    }

    // Method to generate and send OTP
    async generateOTP(email) {
        try {
            const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
            await this.otpRepository.createOTP(email, otp); // Store OTP in the repository
            await sendEmail(email, 'OTP Verification', `Your OTP for verification is: ${otp}`);
            console.log(`OTP generated and sent to ${email}`);
            return otp; // Optional: return OTP for testing purposes
        } catch (error) {
            console.error("Error in OTPService - generateOTP:", error);
            throw error;
        }
    }

    // Method to verify the OTP
    async verifyOTP(email, otp) {
        try {
            const otpRecord = await this.otpRepository.findOTP(email, otp);
            if (!otpRecord) throw new Error('Invalid OTP');
            console.log(`OTP verified for ${email}`);
            return true; // Indicates successful verification
        } catch (error) {
            console.error("Error in OTPService - verifyOTP:", error);
            throw error;
        }
    }
}

module.exports =  OTPService;
