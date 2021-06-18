// 3rd party packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

// hide critical info
require('dotenv/config')

// import the routes
const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotels");
const menuRoutes = require("./routes/menuItems");
const cartRoutes = require("./routes/cart");
// const multerRoute = require('./routes/multer');

const app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now().toString()} - ${file.originalname}`);
//   },
// });

// const filter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Not an image file"), false);
//   }
// };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(multer({ storage: storage, fileFilter: filter }).single('image'));
// app.use("/uploads", express.static(__dirname + "uploads"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// const port = process.env.PORT || 4000;

// Add the routes
app.use("/auth", authRoutes);
app.use("/hotels", hotelRoutes);
app.use("/menu-items", menuRoutes);
app.use("/cart", cartRoutes);
// app.use('/multer', multerRoute)

// error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("MloFaster, Chakula Fika Faster");
    });
  })
  .catch((err) => {
    console.log(err);
  });
