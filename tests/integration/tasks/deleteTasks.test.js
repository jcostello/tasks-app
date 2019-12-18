const request = require('supertest');
const app = require('../../../src/app');
const Task = require('../../../src/models/task');
const TaskFactory = require('../../factories/tasksFactory');
const User = require('../../../src/models/user');
const UserFactory = require('../../factories/usersFactory');
const withAuthentication = require('./../common/authTest')

let task, user;

beforeEach(async () => {
  user = await User.create(UserFactory.build())
  task = await Task.create(TaskFactory.build({ownerId: user.id}))
})

describe('DELETE /tasks/:id', () => {
  withAuthentication('post', '/api/tasks', () => {
    beforeEach(async () => {
      await user.generateJWT();
    })

    it('deletes a task', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${task.id}`)
        .set('Authentication', `Token ${user.token}`)
        
      expect(response.status).toBe(200);
      expect(await Task.countDocuments({})).toBe(0);
    });
  });
});