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
  pincode: {
    type: Number,
    required: [true, 'pincode required'],
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
});

userDetailsSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

userDetailsSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userDetailsSchema);

export default User;
