const { Router } = require('express');
const authMiddleware = require('./../middleware/auth')
const handleErrors = require('./../utils/handleErrors')
const validateRequestParams = require('./../utils/validateAcceptedParams')

const Task = require('../models/task');

const router = Router();

router.post('/api/tasks', authMiddleware, handleErrors(async (req, res) => {
  const task = new Task(req.body);
  task.ownerId = req.currentUser.id

  await task.save();
  res.status(201).send(task);
}));

router.get('/api/tasks', authMiddleware, handleErrors(async (req, res) => {
  const tasks = await Task.find({ownerId: req.currentUser.id })

  res.send(tasks);
}))

router.get('/api/tasks/:id', authMiddleware, handleErrors(async (req, res) => {
  const task = await Task.findOne({ownerId: req.currentUser.id, _id: req.params.id})

  if (!task) {
    return res.status(404).send()
  }

  res.send(task)
}))

router.patch('/api/tasks/:id', authMiddleware, handleErrors(async (req, res) => {
  validateRequestParams(req.body, ['description', 'completed'])

  const task = await Task.findOneAndUpdate({_id: req.params.id, ownerId: req.currentUser.id}, req.body, { new: true, runValidators: true })

  if (!task) {
    return res.status(404).send()
  }

  res.send(task)
}))

router.delete('/api/tasks/:id', authMiddleware, handleErrors(async (req, res) => {
  const task = await Task.findOneAndDelete({_id: req.params.id, ownerId: req.currentUser.id})

  if (!task) {
    return res.status(404).send()
  }

  res.send()
}))

module.exports = router;