import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    require: true,
    unique: true,
  },
  isPercent: {
    type: Boolean,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  expireAfter: {
    type: Date,
  },
  usageLimit: {
    type: Number,
  },
  minCartAmount: {
    type: Number,
  },
  userUsed: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    }],
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
