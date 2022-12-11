import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fname: { type: String },
  lname: { type: String },
  email: { type: String, required: true, dropDups: true },
  password: { type: String, required: true },
  mobileno: { type: Number, minlength: 10, maxlength: 10 },
  gender: { type: String },
  address: {
    type: [
      {
        name: String,
        mobileno: Number,
        address: String,
        locality: String,
        landmark: String,
        alternatemobile: Number,
        city: String,
        district: String,
        pincode: Number,
        state: String,
        default: Boolean,
      },
    ],
  },
  wishlist: [],
  cart: {
    type: [
      {
        name: String,
        _id: String,
        sellerId: String,
        productImg: {
          type: [],
        },
        sellingPrice: Number,
        original_price: Number,
        off: Number,
        stock: Number,
        displayinfo: String,
        cartqty: Number,
      },
    ],
  },
  order: {
    type: [
      {
        displayInfo: String,
        productId: String,
        orderId: String,
        productImg: String,
        sellingPrice: Number,
        date: String,
        address: {},
        qty: Number,
        paymentId: String,
        mrp: Number,
        signature: String,
      },
    ],
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
