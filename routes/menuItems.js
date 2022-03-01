const express = require("express");

const menuController = require("../controllers/menu-items");
const isAuth = require("../middleware/auth-guard");

const router = express.Router();

router.get("/", isAuth, menuController.getMenuItems);

router.post("/add/:hotelId", isAuth, menuController.addMenuItem);

router.put("/update/:itemId", isAuth, menuController.updateMenuItem);

router.delete("/remove/:itemId", isAuth, menuController.deleteMenuItem);

module.exports = router;
