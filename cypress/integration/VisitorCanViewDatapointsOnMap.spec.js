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

  it('datapoints of entries only if they are published', () => {

    let entriesPublished = [
      "#1", "#3"
    ]

    entriesPublished.forEach(entry => {
      cy.get(entry).should('be.visible')
    })

    let entriesNotPublished = [
      "#2", "#4", "#5"
    ]

    entriesNotPublished.forEach(entry => {
      cy.get(entry).should('not.be.visible')
    })
  })
})
