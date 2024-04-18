const UserModel = require('../model/UserModel');
const VendorModel = require('../model/VendorModel');
const otpModel = require('../model/otpModel');
const bcrypt = require("bcryptjs");
const fs = require("fs");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");



// Generate Token
function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
}

// POST post user    
const postUser = async (req, res) => {
  try {
    // Get user details from the request body
    const UserName = req.body.UserName;
    const Email = req.body.Email;
    const MobNo = req.body.MobNo;
    const Password = req.body.Password;
    const Address=req.body.Address;
    const isVendor=req.body.isVendor;


    if (!UserName || !Email || !Password || !MobNo || !Address) {
      res.json({
        status:400,
        message:("Please add all fields")
      })
     
    }
if(!isVendor){
    const userExists = await UserModel.findOne({ Email });
    if (userExists) {
      return res.json({

      status:400,
     message:("User already exists!")})
      
   
    }}
    else{
      const userExists = await VendorModel.findOne({ Email });
      if (userExists) {
        return res.json({
          status:400,
          message:("Vendor already exists!")
        })
    }
  }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

  

  

    // Create user
    let user;
    if(!isVendor){
    user = await UserModel.create({
      UserName,
      Email,
      Password: hashedPassword,
      MobNo,
      Address,
    });}
    else{
       user = await VendorModel.create({
        UserName,
        Email,
        Password: hashedPassword,
        MobNo,
        Address,
      });
    }

    // Return the user information and token
    res.json({
      message: "User information uploaded successfully",
      status:200,
      isVendor:isVendor,
      _id: user._id,
      MobNo: user.MobNo,
      UserName: user.UserName,
      Address:user.Address,
      Email: user.Email,
      token: generateToken(user._id),
    });
  } catch (error) {

    res
      .status(500)
      .json({ message: error + " Try with different Email Id!" });
  }

}

// GET get user
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user || user.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }

    if (user) {
      res.json({
        message: "User exists!",
        status:200,
        _id: user._id,
        MobNo: user.MobNo,
        UserName: user.UserName,
        Email: user.Email,
        
      });
    } else {
      res.json({
      status:400,
      message:"Invalid Credentials!"})
    }
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
}

// POST login user
const loginUser = async (req, res) => {
  const { Email, Password,isVendor } = req.body;
  let user,vendor;
  if(isVendor){
    user = await VendorModel.findOne({ Email
  } );
  vendor=true;
  } 
  else{
  user = await UserModel.findOne({ Email });
  vendor=false;
  }
    if (user && (await bcrypt.compare(Password, user.Password))) {
      res.json({
        message: "User login successful",
        status:200,
       isVendor:vendor,
      _id: user._id,
      MobNo: user.MobNo,
      UserName: user.UserName,
      Email: user.Email,
      Address:user.Address,
      token: generateToken(user._id),
    });
  } else {
    res.json({
      status:400,
      message:"Invalid Credentials!"
    })
  }
}

// PUT update user
const updateUser = async (req, res) => {
  const isVendor=req.body.isVendor;
  let userId;
  if(!isVendor){
   userId = await UserModel.findById(req.user.id);}
  else{
    userId = await VendorModel.findById(req.user.id);
  }
 
  const updatedUserInfo = req.body; // This should contain the updated user information

  try {
    // Find the user by ID and update the information
    let user;
    if(isVendor){
      user = await VendorModel.findByIdAndUpdate(userId, updatedUserInfo, {
        new: true,
      });
    }else{
  user = await UserModel.findByIdAndUpdate(userId, updatedUserInfo, {
      new: true,
    });}
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User information updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }

}

// POST check Password
const checkPass = async (req, res) => {
  let user1;
  
  if(!req.body.isVendor){
  user1 = await UserModel.findById(req.user.id);
}

  else{
    user1 = await VendorModel.findById(req.user.id);
    
  }
  const password = req.body.password;
  try {
    if (!user1) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user1.Password); // Compare hashed password
    if (passwordMatch) {
      res.json({ message: "Password matches" });
    } else {
      res.json({ message: "Password does not match" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
}

// POST Reset Password
const resetPassword = async (req, res) => {
  try {
    // Verify user's email and OTP code
    const { email, otpCode, newPassword } = req.body;
    const otpRecord = await otpModel.findOne({
      email: email,
      code: otpCode,
      expireIn: { $gt: new Date() },
    });
    if (!otpRecord) {
      return res.status(200).json({
        statusText: "OtpError",
        message: "Invalid OTP Code!",
      });
    }

    // Update user's password
    let user;
    if(req.body.isVendor){
      user = await VendorModel.findOne({ Email: email})
    }else{
    user = await UserModel.findOne({ Email: email });}
   const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.Password = hashedPassword;
    await user.save();
    // Delete the OTP record from the database
    await otpModel.deleteOne({ _id: otpRecord._id });

    // Return success response
    return res.status(200).json({
      statusText: "Success",
      message: "Password has been changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusText: "error",
      message: "Something Went Wrong!",
    });
  }

}




module.exports = {
  postUser,
  getUser,
  loginUser,
  updateUser,
  checkPass,
  resetPassword,
}