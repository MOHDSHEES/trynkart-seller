import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
  id: { type: String },
  img_src: { type: String, required: true },
  category: { type: String },
});

const itemsModel = mongoose.model("Items", itemsSchema);

export default itemsModel;
