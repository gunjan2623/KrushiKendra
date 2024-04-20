const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController.js')



// Route to post cart data
router.post('/addtocart', cartController.addtoCart);



module.exports = router