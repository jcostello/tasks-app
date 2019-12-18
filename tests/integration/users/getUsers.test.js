const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user')
const UserFactory = require('../../factories/usersFactory');
const withAuthentication = require('./../common/authTest')

let user;

beforeEach(async () => {
  user = await User.create(UserFactory.build());
})

describe('GET /users/me', () => {
  withAuthentication('get', `/api/users/me`, () => {
    beforeEach(async () => {
      await user.generateJWT();
    })

    it('returns an user', async () => {
      const response = await request(app)
        .get(`/api/users/me`)
        .set('Authentication', `Token ${user.token}`);
        
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(user.name);
    });
  });
});

