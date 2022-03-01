const express = require("express");

const hotelController = require("../controllers/hotels");
const isAuth = require("../middleware/auth-guard");
const { imageUpload } = require("../multer");

const router = express.Router();

router.get("/", hotelController.getHotels);

router.post(
  "/add",
  isAuth,
  imageUpload,
  hotelController.addHotel,
);

router.put("/hotel/:hotelId", isAuth, hotelController.updateHotel);

router.delete("/delete/:hotelId", isAuth, hotelController.removeHotel);

module.exports = router;

// TODO: DON'T FORGET TO ADD BACK THE AUTH-GUARD MIDDLEWARE TO THE ROUTES
