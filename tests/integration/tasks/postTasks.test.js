const request = require('supertest');
const app = require('../../../src/app');
const Task = require('../../../src/models/task');
const User = require('../../../src/models/user');
const UserFactory = require('../../factories/usersFactory');
const withAuthentication = require('./../common/authTest')

const validTask = {
  description: 'A Description'
}

let user;

beforeEach(async () => {
  user = await User.create(UserFactory.build())
})

describe('POST /tasks', () => {
  withAuthentication('post', '/api/tasks', () => {
    beforeEach(async () => {
      await user.generateJWT();
    })

    describe('with valid attributes', () => {
      it('creates a task', async () => {
        const response = await request(app)
          .post('/api/tasks')
          .set('Authentication', `Token ${user.token}`)
          .send(validTask);
          
        expect(response.status).toBe(201);
        expect(response.body.description).toBe(validTask.description);

        expect(await Task.countDocuments({})).toBe(1);
      });
    });

    describe('with any invalid attribute', () => {
      it('rejects the user', async () => {
        invalidTask = {...validTask, description: '' }
        const response = await request(app)
          .post('/api/tasks')
          .set('Authentication', `Token ${user.token}`)
          .send(invalidTask)

        expect(response.status).toBe(400)
        expect(await Task.countDocuments({})).toBe(0);
      })
    });
  });
});

