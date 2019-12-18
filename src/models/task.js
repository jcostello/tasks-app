const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  description: { 
    type: String,
    required: true,
    trim: true
  },

  completed: {
    type: Boolean,
    default: false
  },

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = Task;