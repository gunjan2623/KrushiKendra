const express = require('express');
const router = express.Router();
const prodController = require('../controllers/prodController.js');
const upload = require("../controllers/multerStorage.js");

router.post('/produpload', upload.single('image'), prodController.postProd);

module.exports = router;