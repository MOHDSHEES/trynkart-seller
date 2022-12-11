import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  type: Map,
  of: String,
});

const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
