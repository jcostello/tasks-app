const request = require('supertest');
const app = require('../../../src/app');

const withAuthentication = (method, endpoint, tests) => {
  if (!['get', 'post', 'delete', 'patch'].includes(method)) {
    throw new Error('Invalid REST method')
  }

  describe('With authentication', () => {
    tests()
  })

  describe('Without authentication', () => {
    it('returns 401', async () => {
      const response = await request(app)[method](endpoint)
        
      expect(response.status).toBe(401);
    });
  })

  describe('With invalid token', () => {
    it('returns 401', async () => {
      const response = await request(app)[method](endpoint)
        .set('Authentication', `Token invalidToken`);
        
      expect(response.status).toBe(401);
    });
  })
}

module.exports = withAuthentication;
