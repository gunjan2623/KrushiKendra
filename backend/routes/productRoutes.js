const express = require('express');
const router = express.Router();
const prodController = require('../controllers/prodController.js');
const upload = require("../controllers/multerStorage.js");

router.post('/produpload', upload.single('image'), prodController.postProd);
router.get ('/prodget', prodController.getprod);

// (added by Prajwal)
router.get ('/prodget/products/:category', prodController.getprodByCategory);
router.get ('/prodget/vendor/:vendor', prodController.getprodByVendor);

module.exports = router;
