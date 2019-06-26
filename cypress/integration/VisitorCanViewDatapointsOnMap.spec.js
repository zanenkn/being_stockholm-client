describe('Visitor can view on the map', () => {

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

  it('datapoints of posts only if they are published', () => {

    let postsPublished = [
      "#1", "#3"
    ]

    postsPublished.forEach(post => {
      cy.get(post).should('be.visible')
    })

    let postsNotPublished = [
      "#2", "#4", "#5"
    ]

    postsNotPublished.forEach(post => {
      cy.get(post).should('not.be.visible')
    })
  })
})
