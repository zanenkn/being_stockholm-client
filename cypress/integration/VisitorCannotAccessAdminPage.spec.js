describe('Visitor cannot', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.visit('http://localhost:3000')
  })

  it('see the Admin link in the menu', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#admin-link').should('not.be.visible')
  })

  it('access the Admin page even if she manually enters the route in the browser', () => {
    cy.visit('http://localhost:3000/admin')
    cy.get('#map').should('not.be.visible')
    cy.contains('You cannot access this page!')
  })
})
