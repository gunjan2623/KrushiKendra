const ProductModel = require("../model/ProductModel");
const fs = require("fs");
const sharp = require("sharp");

const postProd = async (req, res) => {
  try {
    const { name, category, vendorAddress, price, quantity, email } = req.body;

    if (!name || !category || !vendorAddress || !price || !quantity || !email) {
      res.json({
        status: 400,
        message: "Please add all fields",
      });
    }

    const compressedFilePath = "uploads/compressed-" + req.file.filename;

    await sharp(req.file.path)
      .resize({ width: 800 })
      .toFile(compressedFilePath);

    const product = await ProductModel.create({
      Vendor_Email: email,
      Product_name: name,
      Product_category: category,
      Vendor_address: vendorAddress,
      Product_price: price,
      Product_quantity: quantity,
      img: {
        data: fs.readFileSync(compressedFilePath),
        contentType: "image/jpeg",
      },
    });

    fs.unlinkSync(req.file.path);
    fs.unlinkSync(compressedFilePath);
    res.json({
      message: "Product information and image uploaded successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

//get all products
const getprod = async (req, res) => {
  try {
    const products = await ProductModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "AllProducts",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

//added by prajwal
const getprodByCategory = async (req, res) => {
  const Product_category = req.params.category;
  const products = await ProductModel.find({ Product_category }).select("-img");
  res.status(200).json(products);
};
const getprodByVendor = async (req, res) => {
  const Vendor_Email = req.params.vendor;
  const products = await ProductModel.find({ Vendor_Email }).select("-img");
  res.status(200).json(products);
};

module.exports = {
  postProd,
  getprod,
  getprodByCategory,
  getprodByVendor,
};
