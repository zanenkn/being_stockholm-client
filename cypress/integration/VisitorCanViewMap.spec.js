describe('Visitor can view Map', () => {

  beforeEach(function () {
    cy.viewport(1536, 785)
    cy.visit('http://localhost:3001/')
  })

  it('and see logo-text', () => {
    cy.contains('Being Stockholm')
  })

  it('and zoom-in and zoom-out', () => {
    cy.get('.gm-style > .gmnoprint > .gmnoprint:nth-child(1) > div > .gm-control-active:nth-child(1)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint:nth-child(1) > div > .gm-control-active:nth-child(1)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
  })

  it('and see + icon', () => {
    cy.get('body > #root > div > .plus').click()
  })
})