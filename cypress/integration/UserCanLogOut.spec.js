describe('User can log out', () => {
  it('successfully', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth/sign_in',
      response: 'fixture:successful_login_user.json',
      headers: {
        "uid": "zane@mail.com"
      }
    })
    cy.route({
      method: 'DELETE',
      url: 'http://localhost:3002/api/v1/auth/sign_out',
      response: 'fixture:successful_logout.json',
    })
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.get('#login-form').within(() => {
      cy.get('#email').type('zane@mail.com')
      cy.get('#password').type('password')
    })
    cy.get('#login_form_button').click()

    cy.get('#footer-menu-icon').click()
    cy.get('#menu-sidebar').should('be.visible')
    cy.contains('Log out')
    cy.get('#log-out-link').click()
    cy.get('#menu-sidebar').should('not.be.visible')
    cy.get('#map-icon-plus').should('be.visible')
    cy.get('#footer-menu-icon').click()
    cy.get('#menu-sidebar').should('be.visible')
    cy.contains('Log out').should('not.exist')
  })
})