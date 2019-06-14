describe('Visitor can view Footer', () => {

  beforeEach(function () {
    cy.viewport(1366, 542)
    cy.visit('http://localhost:3000/')
  })

  it('and see logo', () => {
    cy.contains('Being Stockholm')
  })

  it('and click and see sidebar menu', () => {
    cy.get('#menu_sidebar').should('not.be.visible')
    cy.get('#root > #footer > .row > .center > #footer-menu-icon').click()
    cy.get('#menu_sidebar').should('be.visible')
    cy.get('#menu_sidebar').contains('MENU')
    cy.get('#root > #footer > .row > .center > #footer-menu-icon').click()
    cy.get('#menu_sidebar').should('not.be.visible')
  })
})
