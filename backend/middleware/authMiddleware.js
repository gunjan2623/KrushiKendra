const jwt =require ('jsonwebtoken')
const asyncHandler =require('express-async-handler')
const User = require('../model/UserModel')
const Vendor = require('../model/VendorModel')

const protect =asyncHandler(async(req,res, next)=>{
    let token
    let isVendor=req.body.isVendor;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token =req.headers.authorization.split(' ')[1]

            //verify token
            const decoded =jwt.verify(token,process.env.JWT_SECRET)

            //get user from the token
            if(isVendor){
                req.user =await Vendor.findById(decoded.id).select('-Password');}
                
                else{
            req.user =await User.findById(decoded.id).select('-Password')
        }

            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error("Not authorized")

        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports ={protect}