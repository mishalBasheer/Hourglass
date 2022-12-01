import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'A banner must have a title'],
      unique: true,
    },
    image:{
      type:String,
      default:"banner_logo.jpg",
    },
    url:{
        type:String,
    },
    description:{
      type:String,
    }
  });
const Banner = mongoose.model('Banner',bannerSchema);

  export default Banner;