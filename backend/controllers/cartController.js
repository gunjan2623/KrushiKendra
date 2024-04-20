const CartModel = require("../model/CartModel");
const ProductModel = require("../model/ProductModel");

const addtoCart = async (req, res) => {
  try {
    // Get the product details from the request body
    const { userId, productId, quantity } = req.body;

    // Check if the user already has a cart
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      // User already has a cart, check if the product is already present
      const existingProduct = cart.products.find(
        (product) => product.productId.toString() === productId.toString()
      );
      if (existingProduct) {
        // Product is already present in the cart
        return res.json({
          status: 400,
          message: "Product is already present in the cart",
        });
      }

      // Product is not present, add it to the existing cart
      cart.products.push({ productId, quantity });
    } else {
      // User does not have a cart, create a new cart
      cart = new CartModel({
        userId,
        products: [{ productId, quantity }],
        // other fields...
      });
    }

    // Save the updated cart
    const savedCart = await cart.save();
    res.json({
      status: 201,
      message: "Product added to cart",
      cart: savedCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//remove product from cart
const removeFromCart = async (req, res) => {
  try {
    console.log(req.params);
    const { userId } = req.params;
    const { productId } = req.params;

    // Find the cart of the user
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (product) => product.productId.toString() !== productId
    );

    // Save the updated cart
    const savedCart = await cart.save();

    res
      .status(200)
      .json({ message: "Product removed from cart", cart: savedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addtoCart,
  removeFromCart,
};
