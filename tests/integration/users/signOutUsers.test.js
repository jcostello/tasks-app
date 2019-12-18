const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');
const UserFactory = require('../../factories/usersFactory');
const withAuthentication = require('./../common/authTest')

let user;

beforeEach(async () => {
  user = await User.create(UserFactory.build());
})

describe('GET /users', () => {
  withAuthentication('post', '/api/users/sign_out', () => {
    beforeEach(async () => {
      await user.generateJWT();
    })

    it('returns the user if credentials match', async () => {
      const response = await request(app)
        .post('/api/users/sign_out')
        .set('Authentication', `Token ${user.token}`)

      expect(response.status).toBe(200)

      user = await User.findById(user.id)
      expect(user.token).toBeNull()
    })
  })
})
