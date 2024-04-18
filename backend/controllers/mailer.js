var nodemailer = require("nodemailer");

const commonTransporter=nodemailer.createTransport({
  service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: "CarConnect30@gmail.com",
        pass: "cczkrcmsemsygfeb",
      },
    });


// email body for password
const passwordMailer = (otp, email) => {


    let transporter = commonTransporter;
    let mailOptions = {
      from: "CarConnect30@gmail.com",
      to: `${email}`,
      subject: "Sending Email to reset Password ",
      html: `
      <p>You have requested to reset your password.</p>
      <p style="font-size: 24px; border: 1px solid black; padding: 10px;"> ${otp}</p>
      <p>Please use the above OTP to reset your password. This OTP is valid for the next 5 minutes only.</p>
    `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        // console.log(error);
      } else {
        // console.log("Email sent: " + info.response);
      }
    });
  };

  const carSchedMailer = (email) => {
    let transporter = commonTransporter;
    let mailOptions = {
      from: "CarConnect30@gmail.com",
      to: `${email}`,
      subject: 'Subscription ending soon',
      text: 'Your subscription is ending soon.'
  }
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
}

  module.exports={
    passwordMailer,
    carSchedMailer,
  };