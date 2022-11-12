import mongoose from 'mongoose';

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

const User = mongoose.model('User', userDetailsSchema);

export default User;
