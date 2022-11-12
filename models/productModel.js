import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'A product must have a title'],
      unique: [true, 'A product must have a unique title'],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    price: {
      type: Number,
      required: [true,'A product must have a price'],
    },
    // category: {
    //   type: String,
    //   required: [true, 'A product must have a category'],
    // },
    // brand: {
    //   type: String
    // }
  });
  const Product = mongoose.model('Product',productSchema);

  export default Product;