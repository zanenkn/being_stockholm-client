describe('Visitor can view Footer', () => {

  beforeEach(function () {
    cy.viewport(1366, 542)
    cy.visit('http://localhost:3000/')
  })

  it('and see logo', () => {
    cy.contains('Being Stockholm')
  })

  it('and click and see sidebar menu', () => {
    cy.get('#menu-sidebar').should('not.be.visible')
    cy.get('#footer-menu-icon').click()
    cy.get('#menu-sidebar').should('be.visible')
    cy.get('#menu-sidebar').contains('MENU')
    cy.get('#footer-menu-icon').click()
    cy.get('#menu-sidebar').should('not.be.visible')
  })
})
