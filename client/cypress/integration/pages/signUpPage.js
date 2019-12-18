class SignUpPage {
  constructor() {
    cy.server()
  }

  visit = () => {
    cy.visit('/sign_up')
  }

  fillFields = (user) => {
    this.user = user

    cy.get('#name')
      .type(user.name)

    cy.get('#age')
      .type(user.age)

    cy.get('#email')
      .type(user.email)

    cy.get('#password')
      .type(user.password)

  }

  submit = () => {
    cy.route({
      url: `/api/users/sign_up`,
      method: 'POST',
      status: 200,
      response: { ...this.user, token: 'token' }
    })

    cy.get('#submit').click()
  }
}

module.exports = SignUpPage