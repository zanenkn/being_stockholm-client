describe('Visitor can view Map', () => {

  beforeEach(function () {
    cy.viewport(1536, 785)
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
      status: 200
    })
    cy.visit('http://localhost:3000/')
  })

  it('and zoom-in and zoom-out', () => {
    cy.get('.gm-style > .gmnoprint > .gmnoprint:nth-child(1) > div > .gm-control-active:nth-child(1)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint:nth-child(1) > div > .gm-control-active:nth-child(1)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
  })

  it('and see + icon', () => {
    cy.get('#map-icon-plus').should('be.visible')
  })
})
