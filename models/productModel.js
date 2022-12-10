import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A product must have a title'],
      // unique: [true, 'A product must have a unique title'],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'please specify product brand'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'please specify product category'],
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    description: {
      type: String,
      required: [true, 'Product must have a desciption'],
    },
    images: {
      type: Array,
      required: [true, 'add atleast 1 image'],
    },
    thumbnail: {
      type: String,
      required: [true, 'a producct must have a thumbnail'],
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    breadth: {
      type: Number,
    },
    warranty: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    material: {
      type: String,
    },
    stock: {
      type: Number,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;
