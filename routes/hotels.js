const express = require("express");

const hotelController = require("../controllers/hotels");
const menuController = require("../controllers/menu-items");
const isAuth = require("../middleware/auth-guard");
const { imageUpload } = require("../multer");

const router = express.Router();

router.get("/", hotelController.getHotels);

router.get("/:hotelId/menu-items", menuController.getMenuItems);

module.exports = router;
