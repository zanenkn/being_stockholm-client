describe('Visitor can', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:create_post_success.json',
      status: 200,
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth/sign_in',
      status: 200,
      response: 'fixture:successful_login_user.json',
      headers: {
        "uid": "carla@mail.com"
      }
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.visit('http://localhost:3000')
    cy.get('#map-icon-plus').click()
  })

  it('see login-form when clicking on plus-icon', () => {
    cy.get('#login-form').should('be.visible')
  })

  it('create post successfully after log-in', () => {
    cy.get('#login-form').within(() => {
      cy.get('#email').type('carla@mail.com')
      cy.get('#password').type('password')
    })
    cy.get('#login_form_button').click()
    cy.contains('You have succesfully logged in')
    cy.wait(3000)
    cy.get('#map-icon-plus').click()
    cy.get('#caption').type('Swedenborgsgatan great summer street!')
    cy.get('#play').should('have.class', 'active')
    cy.get('#work').click()
    cy.get('#upload-button').click()
    cy.contains('Thank you for sharing your picture!')

    let text = ['#show-form', '#show-toggle', '#hide-form', '#hide-toggle']

    text.forEach(link => {
      cy.get(link).should('not.be.visible')
    })
  })
})
