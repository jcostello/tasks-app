const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const AuthenticationException = require('./../exceptions/AuthenticationException')

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    trim: true,
    required: true
  },

  age: {
    type: Number,
    default: 0
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(email) {
      if (!validator.isEmail(email)) {
        throw new Error('Email is invalid')
      }
    }
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    validate(password) {
      if (validator.contains(password, 'password')) {
        throw new Error('Password cannot contain "password" string');
      }
    }
  },

  token: {
    type: String,
  }
});

userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})

  if (!user) {
    throw new AuthenticationException('User not found')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new AuthenticationException('Invalid password')
  }

  return user
}

userSchema.methods.generateJWT = async function() {
  const user = this
  const token = jwt.sign({id: user.id.toString()}, process.env.SECRET)

  user.token = token
  await user.save()

  return token
}

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'ownerId'
})

const User = mongoose.model('User', userSchema)

module.exports = User;