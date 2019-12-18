const jwt = require('jsonwebtoken');
const User = require('./../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authentication').replace('Token ', '')
    jwt.verify(token, process.env.SECRET)
    const user = await User.findOne({token: token})

    if (!user) {
      throw new Error()
    }

    req.currentUser = user

    next()
  } catch (error) {
    res.status(401).send('This endpoint requires authentication')
  }
}

module.exports = auth