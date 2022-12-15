import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userDetailsSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'first name required'],
  },
  lname: {
    type: String,
    required: [true, 'last name required'],
  },
  mob: {
    type: Number,
    required: [true, 'mobile number required'],
    // unique: [true,'number existing'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'email field required'],
  },
  password: {
    type: String,
    required: [true, 'password field required'],
    minlength: [6, 'password should be at least 6 characters'],
  },
  block: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: 'user_icon.jpg',
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: [true, 'category id not added'],
  },
  wishlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist',
    required: [true, 'wishlist id not added'],
  },
});

userDetailsSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

// userDetailsSchema.pre('update', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 12);
// });

userDetailsSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userDetailsSchema);

export default User;
