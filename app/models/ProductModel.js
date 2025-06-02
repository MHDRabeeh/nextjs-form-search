import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["in_stock", "out_of_stock", "Discontinued"],
    default: "in_stock",
    required: true,
  },
  discription: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
