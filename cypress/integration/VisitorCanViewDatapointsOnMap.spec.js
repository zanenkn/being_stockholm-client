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
      "#post_1", "#post_3"
    ]

    postsPublished.forEach(post => {
      cy.get(post).should('be.visible')
    })

    let postsNotPublished = [
      "#post_2", "#post_4", "#post_5"
    ]

    postsNotPublished.forEach(post => {
      cy.get(post).should('not.be.visible')
    })
  })

  it('datapoints in different category colors', () => {

    cy.get('#post_1').should('have.class', 'teal')
    cy.get('#post_3').should('have.class', 'yellow')
  })
})
