const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware.js')


// Route to post user
router.post('/userupload', userController.postUser);

// Route to get user 
router.get('/api/getuser/:id', userController.getUser);

// Route to log in user
router.post('/loginuser', userController.loginUser);

// Route to update user details
router.put('/updateuser', protect, userController.updateUser);

//Route to check user password
router.post('/userpass', protect, userController.checkPass);

// Route to reset Password
router.post('/respass', userController.resetPassword)


module.exports = router