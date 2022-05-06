const Order = require("../models/order");
const User = require("../models/user");

exports.checkout = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const items = user.cart.items;

    let total = 0;
    items.forEach((i) => {
      total += i.quantity * i.price;
    });
    res.status(200).json({
      totalSum: total,
      items: items,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  // let totalSum = 0;
  // try {
  //   const user = await User.findById(req.userId);

  //   user.cart.items.forEach((i) => {
  //     totalSum += i.quantity * i.price;
  //   });
  //   const items = user.cart.items.map((i) => {
  //     return {
  //       name: i.name,
  //       quantity: i.quantity,
  //       item: {
  //         ...i.itemId._doc,
  //       },
  //       price: totalSum,
  //     };
  //   });
  //   const order = new Order({
  //     user: {
  //       email: user.email,
  //       userId: req.userId,
  //     },
  //     items: items,
  //   });
  //   const result = await order.save();
  //   user.cart = { items: [] };
  //   await user.save();
  //   res.status(200).json({ result: result });
  // } catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // }
};

exports.getOrders = async (req, res, next) => {
  const user = req.userId;
  const orders = await Order.find();

  let userOrders = [];

  if (orders.length > 0) {
    orders.forEach((order) => {
      if (order.user.userId == req.userId) {
        userOrders.push(order);
      }
    });
    res.status(200).json({
      msg: "success",
      orders: userOrders,
    });
  } else {
    res.status(401).json({ message: "no orders found" });
  }
};

exports.order = async (req, res, next) => {
  let totalSum = 0;
  try {
    const user = await User.findById(req.userId);
    user.cart.items.forEach((i) => {
      totalSum += i.quantity * i.price;
    });
    const items = user.cart.items.map((i) => {
      return {
        name: i.name,
        quantity: i.quantity,
        item: {
          ...i.itemId._doc,
        },
        price: totalSum,
      };
    });
    const order = new Order({
      user: {
        email: user.email,
        userId: req.userId,
      },
      items: items,
      price: totalSum,
    });

    const [result, _, updatedUser] = await Promise.allSettled([
      order.save(),
      (user.cart = { items: [] }),
      user.save(),
    ]);
    return res
      .status(200)
      .json({ result: result.value, updatedUser: updatedUser.value });
  } catch (e) {
    if (!e.statusCode) e.statusCode = 500;
    next(e);
  }
};
