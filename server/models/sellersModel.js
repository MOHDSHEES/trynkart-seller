import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, dropDups: true },
  password: { type: String, required: true },
  mobileno: { type: Number, unique: true, minlength: 10, maxlength: 10 },
  Address: {
    type: {
      address: String,
      locality: String,
      city: String,
      pincode: Number,
      district: String,
      state: String,
    },
  },
  business: {
    type: {
      gstin: String,
      signature: String,
    },
  },
  bank: {
    type: {
      ifcs: String,
      accountNo: Number,
      name: String,
      cheque: String,
    },
  },
  isBlocked: { type: Boolean, default: false },
  order: {
    type: [
      {
        displayInfo: String,
        productId: String,
        orderId: String,
        userId: String,
        productImg: String,
        sellingPrice: Number,
        mrp: Number,
        date: String,
        address: {},
        qty: Number,
        paymentId: String,
        signature: String,
      },
    ],
  },
  listings: {
    type: [
      // {
      //   productId: String,
      //   productImg: [],
      //   name: String,
      //   category: String,
      //   subCategory: String,
      //   brand: String,
      //   MRP: Number,
      //   sellingPrice: Number,
      //   stock: Number,
      //   modelNo: String,
      //   countryOfOrigin: String,
      //   manufactureDate: String,
      //   colors: [],
      // },
    ],
  },
});

const sellerModel = mongoose.model("Seller", sellerSchema);

export default sellerModel;
