describe('Admin can', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
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
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.get('#login-form').within(() => {
      cy.get('#email').type('yatwan@mail.com')
      cy.get('#password').type('password')
    })
    cy.get('#login_form_button').click()
    cy.wait(3000)
  })

  it('see the Admin link in the menu', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#admin-link').should('be.visible')
  })

  it('be redirected to Admin page and see unpublished entries on the map', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#admin-link').click()

    let pending = [
      '#2', '#5'
    ]

    let published = [
      '#1', '#3'
    ]

    pending.forEach(entry => {
      cy.get(entry).should('be.visible')
    })

    published.forEach(entry => {
      cy.get(entry).should('not.be.visible')
    })
  })
})
