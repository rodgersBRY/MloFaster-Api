const Item = require("../models/menu-item");
const User = require("../models/user");
const Order = require("../models/order");
const order = require("../models/order");

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const items = user.cart.items;

    res.status(200).json({
      cartItems: items,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addItemToCart = async (req, res, next) => {
  const itemId = req.params.itemId;

  try {
    const user = await User.findById(req.userId);
    let item = await Item.findById(itemId);

    const cartItemIndex = user.cart.items.findIndex(
      (cp) => cp.itemId.toString() === item._id.toString()
    );

    let newQuantity = 1;
    const updatedCartItems = [...user.cart.items];

    if (cartItemIndex >= 0) {
      newQuantity = user.cart.items[cartItemIndex].quantity + 1;
      updatedCartItems[cartItemIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        name: item.name,
        itemId: item._id,
        quantity: newQuantity,
        price: item.price,
        dateOrdered: Date.now(),
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    user.cart = updatedCart;
    const result = await user.save();
    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const user = await User.findById(req.userId);
    const updatedCartItems = user.cart.items.filter((item) => {
      return item._id.toString() !== itemId.toString();
    });
    user.cart.items = updatedCartItems;
    await user.save();
    res
      .status(200)
      .json({ message: "Item removed from cart", cartItems: user.cart.items });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    user.cart = { items: [] };
    await user.save();
    res.status(200).json({
      message: "Cart cleared",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
