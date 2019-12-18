const { Router } = require('express');
const authMiddleware = require('./../middleware/auth')
const handleErrors = require('./../utils/handleErrors')
const validateRequestParams = require('./../utils/validateAcceptedParams')

const User = require('../models/user');

const router = Router();

router.post('/api/users/sign_up', handleErrors(async (req, res) => {
  const user = new User(req.body);

  await user.save()
  await user.generateJWT()

  res.status(201).send(user);
}));

router.post('/api/users/sign_in', handleErrors(async (req, res) => {
  let user = await User.findByCredentials(req.body.email, req.body.password)

  await user.generateJWT()

  res.send(user)
}))

router.post('/api/users/sign_out', authMiddleware, handleErrors(async (req, res) => {
  const user = req.currentUser
  user.token = null

  await user.save()

  res.status(200).send()
}))


router.get('/api/users/me', authMiddleware, handleErrors(async (req, res) => {
  res.send(req.currentUser)
}));

router.patch('/api/users/me', authMiddleware, handleErrors(async (req, res) => {
  const paramKeys = validateRequestParams(req.body, ['name', 'age', 'email', 'password'])

  const user = req.currentUser

  paramKeys.forEach((param) => user[param] = req.body[param])

  await user.save()

  if (!user) {
    return res.status(404).send();
  }

  res.send(user)
}))

module.exports = router;