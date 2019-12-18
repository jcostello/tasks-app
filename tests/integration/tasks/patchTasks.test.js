const request = require('supertest');
const app = require('../../../src/app');
const Task = require('../../../src/models/task')
const TaskFactory = require('../../factories/tasksFactory');
const User = require('../../../src/models/user');
const UserFactory = require('../../factories/usersFactory');
const withAuthentication = require('./../common/authTest')

let task, user;

beforeEach(async () => {
  user = await User.create(UserFactory.build())
  task = await Task.create(TaskFactory.build({ownerId: user.id}))
})

describe('PATCH /tasks/:id', () => {
  withAuthentication('post', '/api/tasks', () => {
    beforeEach(async () => {
      await user.generateJWT();
    })

    describe('with valid attributes', () => {
      it('updates the user', async () => {
        const newDescription = 'Test Description';

        const response = await request(app)
          .patch(`/api/tasks/${task.id}`)
          .set('Authentication', `Token ${user.token}`)
          .send({description: newDescription});
          
        expect(response.status).toBe(200);
        expect(response.body.description).toBe(newDescription);
      });
    });

    describe('with any invalid attribute', () => {
      it('rejects the user', async () => {
        invalidAttrs = {...task, description: '' }
        const response = await request(app)
          .patch(`/api/tasks/${task.id}`)
          .set('Authentication', `Token ${user.token}`)
          .send(invalidAttrs);

        expect(response.status).toBe(400)
      })
    });
  });
});

