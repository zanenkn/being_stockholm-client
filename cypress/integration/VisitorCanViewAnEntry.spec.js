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
      url: 'http://localhost:3002/api/v1/posts/6',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.visit('http://localhost:3000')
  })

  it('can view an entry', () => { 
    cy.get('#post_6').click()
    cy.contains('Midsommar')
    cy.contains('Drängseredsvägen 86, 448 35 Floda, Sweden')
    cy.contains('2019-06-20 17:28:48')
    cy.get('#image_6').should('have.attr', 'src')
    cy.get('.entry-container').should('have.class', 'yellow')
  })   
})
