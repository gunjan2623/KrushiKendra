const express = require("express");
const router = express.Router();
const prodController = require("../controllers/prodController.js");
const upload = require("../controllers/multerStorage.js");

router.post("/produpload", upload.single("image"), prodController.postProd);
router.get("/prodget", prodController.getprod);
// router.get("/photo", prodController.getprod);

module.exports = router;
