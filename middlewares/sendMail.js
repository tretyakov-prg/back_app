const emailjs = require('@emailjs/browser');
const nodemailer = require('nodemailer');
const axios = require("axios");

const SendMailBasket = async(order, contacts, product) => {
    //console.log(order, contacts)
    await emailjs.send("service_0o680cd","template_bxed0z6",{
        name: contacts.name || "User",
        email: contacts.email,
        html: order
    }, "QD_E-zEWr3mILLjiX")
}

const SendMailNodemaler = (_html) => {
    let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'tridenister@gmail.com',
                //pass: 'DeStar8896114452713!',
                pass: "kokj bkir tubu mhyn"
            }
        }
    );
 
    let mailDetails = {
        from: 'tridenister@gmail.com',
        to: 'tridenis@mail.ru',
        subject: 'Test mail',
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

const SendMailAxios = () => {
    
    var _data = {
        service_id: 'service_0o680cd',
        template_id: 'template_bxed0z6',
        user_id: 'uKE50ajgy0a20of5N',
        // template_params: {
        //     'name': 'James',
        //     'email': "tridenis@mail.ru",
        //     'html': '<p>Hello</p>'
        // }
    };
    const config = {
        method: 'POST',
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        data: JSON.stringify(_data),
        contentType: 'application/json'
    }

    axios(config)
    .then(res => console.log("res"))
    .catch(err => console.log(err.response));
}

module.exports = {
    SendMailBasket,
    SendMailNodemaler,
    SendMailAxios
};