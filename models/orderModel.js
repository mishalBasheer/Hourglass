import mongoose from 'mongoose';
import moment from 'moment';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: String,
    default: moment().format('MMMM Do YYYY'),
  },
  total: {
    type: Number,
  },
  payment: {
    type: String,
  },
  message:String,
  address: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Address',
  },
  products: [
    {
      product: {
        title: {
          type: String,
        },
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      subtotal: {
        type: Number,
      },
    },
  ],
  orderstat:{
    type:String,
    enum:['CONFIRMED','SHIPPED','OUT_FOR_DELIVERY','DELIVERED'],
    default:'CONFIRMED',
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;