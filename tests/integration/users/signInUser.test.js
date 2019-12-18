const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');
const UserFactory = require('../../factories/usersFactory');

const USER_EMAIL = 'test@email.com'
const USER_PASSWORD = 'p4ssw0rd'

beforeEach(async () => {
  await User.create(UserFactory.build({email: USER_EMAIL, password: USER_PASSWORD}));
})

describe('GET /users', () => {
  it('returns the user if credentials match', async () => {
    const response = await request(app)
      .post('/api/users/sign_in')
      .send({email: USER_EMAIL, password: USER_PASSWORD});

    expect(response.status).toBe(200)
    expect(response.body.email).toBe(USER_EMAIL)
    expect(response.body.token).toBeDefined()
  })

  it('returns 404 if credentials dont match', async () => {
    const response = await request(app)
      .post('/api/users/sign_in')
      .send({email: USER_EMAIL, password: 'wrongPassword' });

    expect(response.status).toBe(404)
  })
})