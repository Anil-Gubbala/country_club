var nodemailer = require("nodemailer");

const sendEmail = (to, subject,content) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "clubmail@gmail.com",
          pass: "pass",
        },
      });
      
      var mailOptions = {
        from: "clubmail@gmail.com",
        to: to,
        subject: subject,
        text: content,
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
};

// provide access using this link https://myaccount.google.com/lesssecureapps 

module.exports = sendEmail;

// import sendEmail in your js & 
// call using sendEmail("to address", "sub" , "content")
