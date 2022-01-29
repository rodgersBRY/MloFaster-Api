const express = require("express");

const ordersController = require("../controllers/orders");
const isAuth = require("../middleware/auth-guard");

const router = express.Router();

router.get("/checkout", isAuth, ordersController.checkout);

router.get("/", isAuth, ordersController.getOrders);

router.post("/order", isAuth, ordersController.order);

module.exports = router;
