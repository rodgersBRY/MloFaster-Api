const express = require("express");

const isAuth = require("../middleware/auth-guard");
const hotelController = require("../controllers/hotels");
const menuController = require("../controllers/menu-items");
const { imageUpload } = require("../multer");

const router = express.Router();

router.post("/hotels/add", isAuth, imageUpload, hotelController.addHotel);

router.put("/hotels/:hotelId", isAuth, hotelController.updateHotel);

router.delete("/hotels/delete/:hotelId", isAuth, hotelController.removeHotel);

router.post("hotels/:hotelId/add-menu", isAuth, menuController.addMenuItem);

router.put(
  "hotels/:hotelId/update-item/:itemId",
  isAuth,
  menuController.updateMenuItem
);

router.delete(
  "hotels/:hotelId/remove/:itemId",
  isAuth,
  menuController.deleteMenuItem
);

module.exports = router;
