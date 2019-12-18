const User = require('../../src/models/user')
const UserFactory = require('../factories/usersFactory');

const USER_EMAIL = 'test@email.com'
const USER_PASSWORD = 'p4ssw0rd'

beforeEach(async () => {
  await User.create(UserFactory.build({email: USER_EMAIL, password: USER_PASSWORD}));
})

describe('#findByCredentials', () => {
  it('returns the user if credentials match', async () => {
    const expectedUser = await User.findByCredentials(USER_EMAIL, USER_PASSWORD)

    expect(expectedUser).toBeDefined()
  })

  it('throws an exception if the email doens\'t exists', async () => {
    const findWithWrongEmail = User.findByCredentials('wrong@email.com', USER_PASSWORD)

    await expect(findWithWrongEmail).rejects.toThrow();
  })

  it('throws an exception if the password doens\'t match', async () => {
    const findWithWrongPassword = User.findByCredentials(USER_EMAIL, 'wrongPassword')

    await expect(findWithWrongPassword).rejects.toThrow();
  })
})