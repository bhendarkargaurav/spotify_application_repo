const nodemailer = require('nodemailer');

class EmailService {
  async sendOTP(email, otp) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // service: 'gmail', // or use SMTP server details
        auth: {
        //   user: 'gauravbhendarkar123@gmail.com',
        //   pass: 'lunu khko gebl fbjh', //          
            user: process.env.EMAIL_USER,            //sequerity perpose user and pass is in env filr
            pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: 'gauravbhendarkar2024@gamil.com',
        to: email,
        subject: 'Hii Dear, Your OTP Code is dont share this one time password with anyone',
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
