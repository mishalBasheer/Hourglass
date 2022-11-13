import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminDetailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email field required'],
  },
  password: {
    type: String,
    required: [true, 'password field required'],
  },
});

adminDetailsSchema.methods.comparePassword = function (adminPassword, cb) {
  bcrypt.compare(adminPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Admin = mongoose.model('Admin', adminDetailsSchema);

export default Admin;
