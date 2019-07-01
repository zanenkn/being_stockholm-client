describe('User can log out', () => {
  it('successfully', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
    })
    cy.route({
      method: 'DELETE',
      url: 'http://localhost:3002/api/v1/auth/sign_out',
      response: 'fixture:successful_logout.json',
    })
    cy.login('fixture:successful_login_user.json', 'carla@mail.com', 'password', 200)

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