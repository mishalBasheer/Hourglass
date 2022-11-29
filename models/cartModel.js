import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
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
      price:{
        type: Number,
      },
      quantity: {
        type: Number,
      },
      subtotal:{
        type: Number,
      },
    },
  ],
  total:{
    type:Number,
  },
});


const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
