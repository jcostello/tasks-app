const SignInPage = require('./pages/signInPage')
const userFactory = require('../../../tests/factories/usersFactory')

describe('Sign In', () => {
  let page
  let user

  beforeEach(() => {
    page = new SignInPage()
    user = userFactory.build()

    page.givenIHaveAnUser(user)
    page.visit()
  })

  describe('When the email and password match', () => {
    it('redirects to the home page', () => {
      page.fillCredentials(user.email, user.password)
      page.submitCredentials()

      cy.location('pathname').should('eq', '/')
    })
  })

  describe('When invalid email or password', () => {
    it('shows an error message', () => {
      page.fillCredentials(user.email, 'invalid')
      page.submitCredentials()

      cy.location('pathname').should('eq', '/sign_in')
      cy.contains('Invalid email or password').should('be.visible')
    })
  })
})