import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  created: {
    type: String,
    default: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
