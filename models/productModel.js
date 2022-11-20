import mongoose from "mongoose";
import moment from "moment";
const Date = moment().format("MMMM Do YYYY, h:mm a")

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'A product must have a title'],
      // unique: [true, 'A product must have a unique title'],
    },
    date:{
      type:String,
      default:Date,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Brand',
      required:[true,'please specify product brand']
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Category',
      required:[true,'please specify product category']
    },
    price: {
      type: Number,
      required: [true,'A product must have a price'],
    },
    description: {
      type: String,
      required:[true,'Product must have a desciption']
    },
    images: {
      type: Array,
      required:[true,'add atleast 1 image'],
    },
  });
  const Product = mongoose.model('Product',productSchema);

  export default Product;