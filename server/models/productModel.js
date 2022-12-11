import mongoose from "mongoose";

// mongoose.set("useCreateIndex", true);
// schema.index({ title: "text" });
const productsSchema = new mongoose.Schema({
  // img_src: { type: String, required: true },
  name: { type: String, required: true },
  displayinfo: { type: String },
  category: { type: String },
  total_rating: {
    type: {
      five: { Number },
      four: { Number },
      three: { Number },
      two: { Number },
      one: { Number },
    },
  },
  productImg: [],
  status: { type: String },
  original_price: { type: Number },
  off: { type: Number },
  sellingPrice: { type: Number },
  subCategory: { type: String },
  brand: { type: String },
  modelNo: { type: String },
  countryOfOrigin: { type: String },
  manufactureDate: { type: String },
  reason: { type: String },
  colors: [],
  // qty: { type: Number },
  stock: { type: Number },
  specifications: [],
  sellerId: {
    type: [],
  },
  rating: {
    type: [
      {
        stars: Number,
        title: String,
        description: String,
        name: String,
        date: String,
      },
    ],
    _id: false,
  },
});

// productsSchema.index({ name: "text", category: "text" });
const productsModel = mongoose.model("Products", productsSchema);

export default productsModel;
