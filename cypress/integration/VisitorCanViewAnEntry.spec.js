describe('Visitor can view', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts/5',
      response: 'fixture:view_single_entry.json',
      status: 200
    })
    cy.visit('http://localhost:3000')
  })

  it('can view an entry', () => {
    cy.get('#post_5').click()
    cy.contains('Midsommar')
    cy.contains('Ballonggatan 23, 169 71 Solna, Sweden')
    cy.contains('20-06-2019 | 7:28 PM')
    cy.get('#image_5').should('have.attr', 'src')
    cy.get('#entry-wrapper').should('have.class', 'play')
  })
})
