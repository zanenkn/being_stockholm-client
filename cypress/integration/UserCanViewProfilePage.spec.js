describe('User can', () => {

  beforeEach(function () {
    cy.server()
  })

  it('view user page', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth/sign_in',
      status: 200,
      response: 'fixture:successful_login_user.json',
      headers: {
        "uid": "carla@mail.com"
      }
    })
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.get('#login-form').within(() => {
      cy.get('#email').type('carla@mail.com')
      cy.get('#password').type('password')
    })
    cy.get('#login_form_button').click()
    cy.wait(3000)
    cy.get('#profile-icon').click()
    cy.contains('Please help us make Being Stockholm better and answer this 1 minute survey.')
    cy.get('.submit-button').click()
  })

  it('not view profile page if not logged in', () => {
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.contains('Please help us make Being Stockholm better and answer this 1 minute survey.').should('not.exist')
  })
})