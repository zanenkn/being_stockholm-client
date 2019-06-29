describe('Visitor can view on the map', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
      status: 200
    })
    cy.visit('http://localhost:3000')
  })

  it('datapoints of posts only if they are published', () => {

    let postsPublished = [
      "#6", "#7", "#8", "#9", "#10", "#11"
    ]

    postsPublished.forEach(post => {
      cy.get(post).should('be.visible')
    })
  })

  it('datapoints in 4 different category classes when not signed-in', () => {

    // work
    cy.get('#6').should('have.class', 'datapoint-work-settled')
    cy.get('#7').should('have.class', 'datapoint-work-settled')
    cy.get('#8').should('have.class', 'datapoint-work-newbie')

    // play
    cy.get('#9').should('have.class', 'datapoint-play-settled')
    cy.get('#10').should('have.class', 'datapoint-play-settled')
    cy.get('#11').should('have.class', 'datapoint-play-newbie')
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
    cy.get('#6').should('have.class', 'datapoint-my-work')
    cy.get('#7').should('have.class', 'datapoint-work-settled')
    cy.get('#8').should('have.class', 'datapoint-work-newbie')

    // play
    cy.get('#9').should('have.class', 'datapoint-my-play')
    cy.get('#10').should('have.class', 'datapoint-play-settled')
    cy.get('#11').should('have.class', 'datapoint-play-newbie')
  })

})
