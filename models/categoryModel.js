import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'A category must have a title'],
      unique: true,
    },
    image:{
      type:String,
      default:"user_icon.jpg",
    },
    products:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Product",
    }]
  });
const Category = mongoose.model('Category',categorySchema);

  export default Category;