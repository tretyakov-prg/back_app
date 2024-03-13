const nodemailer = require('nodemailer');

/**
 * Send mail order to client.
 * @param {string} _html Generate HTML oreder page.
 * @param {string} email Email send to user.
 * @param {string} subject Theme mail from user.
 */
const SendMailNodemail = (_html, email, subject) => {
    let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        }
    );
 
    let mailDetails = {
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        html: _html
    };
    
    mailTransporter
        .sendMail(mailDetails,
            function (err, data) {
                if (err) {
                    console.log('Error Occurs: ' + err);
                } else {
                    console.log('Email sent successfully');
                }
            });
}

module.exports = {
    SendMailNodemail
};