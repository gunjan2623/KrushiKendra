const express = require('express');
const router = express.Router();
const emailController =require('../controllers/emailController');

// Route to send email 
router.post('/email-send',emailController.sendEmail);

module.exports=router;