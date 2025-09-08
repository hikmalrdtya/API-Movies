const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
    required: [true, 'Username Do Not Empty']
  },
  email: {
    type: String,
    unique: [true, 'Email has Been Registered'],
    required: [true, 'Email Do Not Empty']
  },
  password: {
    type: String,
    minlength: [8, 'Password to Short'],
    select: false,
    required: [true, 'Password Do Not Empty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


const User = mongoose.model('User', userSchema);

module.exports = User;