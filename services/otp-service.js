const otpGenerator = require('otp-generator');
const OTPRepository = require('../repository/otp-repository');
const EmailService = require('../services/email-service');

class OTPService {
    constructor() {
        this.otpRepository = new OTPRepository();
        this.emailService = new EmailService();
    }

    // Method to generate and send OTP
    async generateOTP(email) {
        try {
            if(!email) {
                throw new Error('Email is required');
            }

            const otp = otpGenerator.generate(6, {digits: true, alphabets: false, upperCase: false, specialChars: false });
            const otpData = { otp, email };

            // console.log('Data to be saved:', otpData); // Debugging log
           
            // return await this.otpRepository.createOTP(otpData);
            await this.otpRepository.createOTP(otpData);
            // console.log(`OTP generated: ${otp}`);

            //Send Otp
            await this.emailService.sendOTP(email, otp);  // send otp to mail
            console.log('OTP email sent successfully');
            
            return { message: 'OTP generated and sent successfully' }

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
