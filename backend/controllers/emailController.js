const otpModel = require('../model/otpModel.js')
const UserModel = require('../model/UserModel.js');
const mailer = require('../controllers/mailer.js')

// POST send email
const sendEmail = async (req, res) => {
  try {
    let data ;
    if(req.body.isVendor){
      data = await VendorModel.findOne({ Email:req.body.Email });
    }else{
     data = await UserModel.findOne({ Email: req.body.Email });}

    const responseType = {};
    if (data) {
      let otpcode = Math.floor(Math.random() * 9000 + 1000);
      let otpData = new otpModel({
        email: req.body.Email,
        code: otpcode,
        expireIn: new Date().getTime() + 5 * 60 * 1000,
      });
      let otpResponse = await otpData.save();
      responseType.statusText = "Success";
      
      mailer.passwordMailer(otpData.code, otpData.email);
      responseType.message = "Please check your Email Id";
    } else {
      responseType.statusText = "error";
      responseType.message = "Email Id not Exist";
    }

    res.status(200).json(responseType);
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendEmail,
}