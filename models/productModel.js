import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'A product must have a title'],
      unique: [true, 'A product must have a unique title'],
    },
    date:{
      type:String,
    },
    brand: {
      type: String,
      required:[true,'please specify product brand']
    },
    category: {
      type: String,
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
 
    // image: {
    //   type: String,
    //   required:[true,'please specify product brand']
    // }
  });
  const Product = mongoose.model('Product',productSchema);

  export default Product;