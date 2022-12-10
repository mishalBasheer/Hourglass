import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A brand must have a title'],
    unique: true,
  },
  image: {
    type: String,
    default: 'brand_logo.jpg',
  },
  description: {
    type: String,
  },
});
const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
