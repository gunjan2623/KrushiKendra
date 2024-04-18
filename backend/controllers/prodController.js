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
            status:200,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: error });
        }
      }

      // (added by Prajwal)
      const getprod = async (req, res) => {
        const products =  await ProductModel.find().select("-img");
        res.status(200).json(products);
      }
      const getprodByCategory = async(req,res)=>{
        const Product_category = req.params.category;
        const products =  await ProductModel.find({Product_category}).select("-img");
        res.status(200).json(products);
      }
      const getprodByVendor = async(req,res)=>{
        const Vendor_Email = req.params.vendor;
        const products =  await ProductModel.find({Vendor_Email}).select("-img");
        res.status(200).json(products);
      }
      
      module.exports={
          postProd,
          getprod,
          getprodByCategory,
          getprodByVendor
      }