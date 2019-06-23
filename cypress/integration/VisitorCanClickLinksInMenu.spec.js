describe('Visitor can click links in menu', () => {

  beforeEach(function () {
    cy.viewport(1366, 542)
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.visit('http://localhost:3000/')
  })

  it('and click on About Project and be redirected', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#menu-sidebar').should('be.visible')
    cy.get('#about').click()
    cy.contains('About Being Stockholm')
    cy.get('#menu-sidebar').should('not.be.visible')
  })

  it('and be redirected from one link to another', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#menu-sidebar').should('be.visible')
    cy.get('#about').click()
    cy.contains('About Being Stockholm')
    cy.get('#menu-sidebar').should('not.be.visible')
    cy.get('#footer-menu-icon').click()
    cy.get('#contact').click()
    cy.contains('Contact')
    cy.get('#menu-sidebar').should('not.be.visible')
  })

})
