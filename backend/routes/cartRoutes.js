const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController.js')



// Route to post cart data
router.post('/addtocart', cartController.addtoCart);

// Route to remove a product from the cart
router.delete("/removefromcart/:productId/:userId", cartController.removeFromCart);

module.exports = router