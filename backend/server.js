const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;

const cors = require("cors");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware.js");
const connectDB = require("./config/db");


const userRoutes = require("./routes/userRoutes.js");
const emailRoutes = require("./routes/emailRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");



connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }



app.use(productRoutes);
app.use(userRoutes);
app.use(emailRoutes);
app.use(cartRoutes);


app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
