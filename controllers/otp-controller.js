const OTPService = require('../services/otp-service');
const otpService = new OTPService();

const generateOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await otpService.generateOTP(email);
        res.status(200).json({ message: 'OTP generated successfully', result });
        // res.status(200).send('OTP sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending OTP');
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        await otpService.verifyOTP(email, otp);
        res.status(200).send('OTP verified successfully');
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
};


module.exports = {
    generateOTP,
    verifyOTP
}

