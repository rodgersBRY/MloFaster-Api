const express = require("express");

const hotelController = require("../controllers/hotels");
const menuController = require("../controllers/menu-items");
const isAuth = require("../middleware/auth-guard");
const { imageUpload } = require("../multer");

const router = express.Router();

router.get("/", hotelController.getHotels);

router.get("/menu-items", isAuth, menuController.getMenuItems);

module.exports = router;

// TODO: DON'T FORGET TO ADD BACK THE AUTH-GUARD MIDDLEWARE TO THE ROUTES
