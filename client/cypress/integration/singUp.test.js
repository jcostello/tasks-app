const SignUpPage = require('./pages/signUpPage')
const userFactory = require('../../../tests/factories/usersFactory')

describe('Sign Up', () => {

  let page
  let newUser

  beforeEach(() => {
    page = new SignUpPage()
    newUser = userFactory.build()

    page.visit()
  })

  describe('When every fill is complete', () => {
    it('redirects to the home page', () => {
      page.fillFields(newUser)
      page.submit()

      cy.location('pathname').should('eq', '/')
    })
  })

  describe('When incomplete fields', () => {
    it('shows an error message', () => {
      page.fillFields({...newUser, name: ' '})
      page.submit()

      cy.location('pathname').should('eq', '/sign_up')
      cy.contains('Please fill all fields').should('be.visible')
    })
  })
})