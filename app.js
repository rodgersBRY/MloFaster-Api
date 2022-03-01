// 3rd party packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

// hide critical info
require("dotenv").config();

// import the routes
const authRoutes = require("./routes/auth");
const hotelRoutes = require("./routes/hotels");
const menuRoutes = require("./routes/menuItems");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const { imageUpload } = require("./multer");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Add the routes
app.use("/auth", authRoutes);
app.use("/hotels", hotelRoutes);
app.use("/menu-items", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);

// error handling middleware
app.use((error, req, res, next) => {
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
