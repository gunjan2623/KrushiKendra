const ProductModel = require("../model/ProductModel");
const fs = require("fs");
const sharp = require("sharp");

const postProd = async (req, res) => {
   
        try {
          const { name, category, vendorAddress, price, quantity,email } = req.body;
      
          if (!name || !category || !vendorAddress || !price || !quantity ||!email) {
            res.status(400);
            throw new Error("Please add all fields");
          }
      
          const compressedFilePath = "uploads/compressed-" + req.file.filename;
      
          await sharp(req.file.path)
            .resize({ width: 800 })
            .toFile(compressedFilePath);
      
          const product = await ProductModel.create({
            Vendor_Email:email,
           Product_name :name, 
            Product_category:category, 
            Vendor_address:vendorAddress, 
           Product_price: price,
            Product_quantity:quantity,
           img: {
              data: fs.readFileSync(compressedFilePath),
              contentType: "image/jpeg",
            },
          });
      
          fs.unlinkSync(req.file.path);
          fs.unlinkSync(compressedFilePath);
          res.json({
            message: "Product information and image uploaded successfully",
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: error });
        }
      }

      module.exports={
          postProd
      }