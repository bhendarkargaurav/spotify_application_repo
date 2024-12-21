// const nodemailer = require('nodemailer');

// class EmailService {       // a class
//     constructor() {
//         this.transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'your-mail@gmail.com',
//                 pass: 'your-app-password'
//             }
//         });
//     }

//     async sendEmail(to, subject, text) {
//         try {
//             const info = await this.transporter.sendMail({
//                 from: 'your-mail@gmail.com',
//                 to,
//                 subject,
//                 text
//             });
//             console.log('Email sent:', info.response);
//             return info;
//         } catch (error) {
//             console.error('Error sending email:', error);
//             throw error;
//         }
//     }
// }

// module.exports = new EmailService();



const nodemailer = require('nodemailer');

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gauravbhendarkar123@gmail',
            pass: 'Dev2@4Tech'
        }
    });
};

const sendEmail = async (to, subject, text) => {
    const transporter = createTransporter();
    try {
        const info = await transporter.sendMail({
            from: 'gauravbhendarkar123@gmail',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`

        });
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = {
    sendEmail
};
