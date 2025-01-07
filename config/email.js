const nodemailer = require('nodemailer');

class EmailService {
  async sendOTP(email, otp) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or use SMTP server details
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password', // Use App Passwords if 2FA is enabled
        },
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}

module.exports = EmailService;
