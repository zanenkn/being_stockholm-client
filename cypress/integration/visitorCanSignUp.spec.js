describe('User can sign up', () => {

  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
    })
  })

  it('successfully', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth',
      status: 200,
      response: 'fixture:successful_signup.json'
    })
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.get('#sign_up').click()
    cy.get('#signup-form').within(() => {
      cy.get('#email').type('zane@mail.com')
      cy.get('#password').type('password')
      cy.get('#password_confirmation').type('password')
    })
    cy.get('#newbie').click()
    cy.get('#sign_up_button').click()
    cy.contains('You have succesfully created an account!')
  })

  it('and gets error message if email is not valid and/or passwords do not match', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth',
      status: 422,
      response: 'fixture:unsuccessful_signup.json',
    })
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.get('#sign_up').click()
    cy.get('#signup-form').within(() => {
      cy.get('#email').type('boa@')
      cy.get('#password').type('pass')
      cy.get('#password_confirmation').type('password')
      cy.get('#sign_up_button').click()
    })
    cy.contains("Password confirmation doesn't match Password")
    cy.contains("Password is too short (minimum is 6 characters")
    cy.contains("Email is not an email")
    cy.contains("Level can't be blank")
  })
})