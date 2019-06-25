describe('Visitor can view on the map', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.visit('http://localhost:3000')
  })

  it('datapoints of posts only if they are published', () => {

    let postsPublished = [
      "#post_6", "#post_7", "#post_8", "#post_9", "#post_10", "#post_11"
    ]

    postsPublished.forEach(post => {
      cy.get(post).should('be.visible')
    })
  })

  it('datapoints in 4 different category colors when not signed-in', () => {

    // work
    cy.get('#post_6').should('have.class', 'purple')
    cy.get('#post_7').should('have.class', 'purple')
    cy.get('#post_8').should('have.class', 'pink')

    // play
    cy.get('#post_9').should('have.class', 'green')
    cy.get('#post_10').should('have.class', 'green')
    cy.get('#post_11').should('have.class', 'olive')
  })

  it('datapoints in 6 different category colors when signed-in', () => {
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
    cy.contains('You have succesfully logged in')

    // work
    cy.get('#post_6').should('have.class', 'teal')
    cy.get('#post_7').should('have.class', 'teal')
    cy.get('#post_8').should('have.class', 'teal')

    // play
    cy.get('#post_9').should('have.class', 'teal')
    cy.get('#post_10').should('have.class', 'teal')
    cy.get('#post_11').should('have.class', 'teal')
  })

})
