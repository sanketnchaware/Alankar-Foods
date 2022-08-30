const nodemailer = require('nodemailer');
export function mailer(email, subject, message) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });
    const mailOptions = {
        from: '',
        to: email,
        subject: subject,
        text: message
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    }
    );
}