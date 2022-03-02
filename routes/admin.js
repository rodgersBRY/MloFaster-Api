const express = require("express");

const isAuth = require("../middleware/auth-guard");
const hotelController = require("../controllers/hotels");
const menuController = require("../controllers/menu-items");
const { imageUpload } = require("../multer");

const router = express.Router();

router.post("/hotel/add", isAuth, imageUpload, hotelController.addHotel);

router.put("/hotel/:hotelId", isAuth, hotelController.updateHotel);

router.delete("/hotel/:hotelId", isAuth, hotelController.removeHotel);

router.post("/hotel/:hotelId/add-item", isAuth, menuController.addMenuItem);

router.put(
  "/hotel/:hotelId/update-item/:itemId",
  isAuth,
  menuController.updateMenuItem
);

router.delete(
  "/hotel/:hotelId/remove/:itemId",
  isAuth,
  menuController.deleteMenuItem
);

router.put("/hotel/:hotelId/update-item/:itemId", isAuth, menuController.updateMenuItem);

router.delete("/hotel/:hotelId/remove-item/:itemId", isAuth, menuController.deleteMenuItem);

module.exports = router;
