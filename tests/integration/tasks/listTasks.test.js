const request = require('supertest');
const app = require('../../../src/app');
const Task = require('../../../src/models/task');
const TaskFactory = require('../../factories/tasksFactory');
const User = require('../../../src/models/user');
const UserFactory = require('../../factories/usersFactory');
const withAuthentication = require('./../common/authTest')

let tasks, user;

beforeEach(async () => {
  user = await User.create(UserFactory.build())
  tasks = await Task.create(TaskFactory.buildList(2, { ownerId: user.id }));
})

describe('GET /users', () => {
  withAuthentication('post', '/api/tasks', () => {
    beforeEach(async () => {
      await user.generateJWT();
    })

    it('return a list of tasks', async () => {
      const response = await request(app)
        .get('/api/tasks/')
        .set('Authentication', `Token ${user.token}`)
        
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(tasks.length);
    });
  });
});