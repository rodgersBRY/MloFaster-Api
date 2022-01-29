const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        name: { type: String, required: true },
        itemId: {
          type: Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    // total: {
    //   type: Number,
    //   required: true,
    // },
  },
});

module.exports = mongoose.model("User", userSchema);
