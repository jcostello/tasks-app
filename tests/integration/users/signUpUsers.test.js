const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');

const validUser = {
  name: 'Juan',
  age: 30,
  email: 'email@test.com',
  password: 'p4ssw0rd'
}

describe('POST /users', () => {
  describe('with valid attributes', () => {
    it('creates an user', async () => {
      const response = await request(app)
        .post('/api/users/sign_up')
        .send(validUser);
        
      expect(response.status).toBe(201);
      expect(response.body.email).toBe(validUser.email);
      expect(response.body.token).toBeDefined();

      expect(await User.countDocuments({})).toBe(1);
    });

    it('hashes the password', async () => {
      const response = await request(app)
        .post('/api/users/sign_up')
        .send(validUser);
        
      expect(response.body.password).not.toBe(validUser.password)
    })
  });

  describe('with any invalid attribute', () => {
    it('rejects the user', async () => {
      invalidUser = {...validUser, name: '' }
      const response = await request(app)
        .post('/api/users/sign_up')
        .send(invalidUser)

      expect(response.status).toBe(400)
      expect(await User.countDocuments({})).toBe(0);
    })
  });
});

