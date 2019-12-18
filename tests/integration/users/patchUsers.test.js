const request = require('supertest');
const app = require('../../../src/app');
const User = require('../../../src/models/user');
const UserFactory = require('../../factories/usersFactory');
const withAuthentication = require('./../common/authTest')

let user;

beforeEach(async () => {
  user = await User.create(UserFactory.build())
})

describe('PATCH /users/:id', () => {
  withAuthentication('patch', '/api/users/me', () => {
    beforeEach(async () => {
      await user.generateJWT();
    })

    describe('with valid attributes', () => {
      it('updates the user', async () => {
        const newName = 'Juan Manuel';

        const response = await request(app)
          .patch('/api/users/me')
          .set('Authentication', `Token ${user.token}`)
          .send({name: newName});
          
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(newName);
        expect(response.body.email).toBe(user.email);
      });

      it('hashes the password', async () => {
        const newPassword = 'password'
        const response = await request(app)
          .patch('/api/users/me')
          .set('Authentication', `Token ${user.token}`)
          .send({password: newPassword});
          
        expect(response.body.password).not.toBe(newPassword)
        expect(response.body.password).not.toBe(user.password)
      })
    });

    describe('with any invalid attribute', () => {
      it('rejects the user', async () => {
        invalidAttrs = {...user, name: '' }
        const response = await request(app)
          .patch('/api/users/me')
          .set('Authentication', `Token ${user.token}`)
          .send(invalidAttrs);

        expect(response.status).toBe(400)
      })
    });
  });
});

