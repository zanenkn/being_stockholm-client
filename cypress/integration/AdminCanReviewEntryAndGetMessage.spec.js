describe('Admin can review an entry and', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth/sign_in',
      status: 200,
      response: 'fixture:successful_login_admin.json',
      headers: {
        "uid": "yatwan@mail.com"
      }
    })
    cy.route({
      method: 'PATCH',
      url: 'http://localhost:3002/api/v1/posts/2',
      status: 200,
      response: 'fixture:successful_review_from_admin.json',
      headers: {
        "uid": "yatwan@mail.com"
      }
    })
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.get('#login-form').within(() => {
      cy.get('#email').type('yatwan@mail.com')
      cy.get('#password').type('password')
    })
    cy.get('#login_form_button').click()
    cy.wait(3000)
  })

  it('get Accept popup message if she accepts the entry', () => {

    let IDs = [
      '#footer-menu-icon', '#admin-link', '#2', '#accept-button'
    ]

    IDs.forEach(id => {
      cy.get(id).click()
      cy.wait(1000)
    })

    cy.contains('You have accepted this post!')
  })

  it('get Decline popup message if she does not accept the entry', () => {

    let IDs = [
      '#footer-menu-icon', '#admin-link', '#2', '#decline-button'
    ]

    IDs.forEach(id => {
      cy.get(id).click()
      cy.wait(1000)
    })

    cy.contains('You have declined this post!')
  })
})
