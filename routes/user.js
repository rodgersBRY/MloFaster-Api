const express = require("express");

const ordersController = require("../controllers/orders");
const cartController = require("../controllers/cart");

const isAuth = require("../middleware/auth-guard");

const router = express.Router();

// order routes
router.get("/checkout", isAuth, ordersController.checkout);
router.get("/orders", isAuth, ordersController.getOrders);
router.post("/place-order", isAuth, ordersController.order);

// cart routes
router.get("/cart", isAuth, cartController.getCart);
router.post("/cart/add/:itemId", isAuth, cartController.addItemToCart);
router.post("/cart/clear", isAuth, cartController.clearCart);
router.delete("/cart/:itemId", isAuth, cartController.removeFromCart);

module.exports = router;
