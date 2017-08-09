const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;
// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});

userSchema.pre('save', function (next) {
  // Can't use arrow function because of the binding
  const user = this;
  // Disallow encrypting every single time a user is saved
  // (encrypt only when a user is created for the first time)
  if (!user.isNew) {
    next();
  }
  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Any user created using this schema will have access to comparePassword,
// and it is a function in this case:
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  const user = this; // Just to clarify that 'this' is a user object
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// Create model class
const ModelClass = mongoose.model('user', userSchema);

export default ModelClass;
