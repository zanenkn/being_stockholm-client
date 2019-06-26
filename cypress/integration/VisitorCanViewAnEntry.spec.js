describe('Visitor can view', () => {

  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts/3',
      response: 'fixture:view_single_entry.json',
      status: 200
    })
    cy.visit('http://localhost:3000')
  })

  it('can view an entry', () => {
    cy.get('#3').click()

    let text = ['Midsommar', 'Ballonggatan 23, 169 71 Solna, Sweden', '20-06-2019 | 19:28']

    text.forEach(post => {
      cy.contains(post)
    })

    cy.get('#image_3').should('have.attr', 'src')
    cy.get('#entry-wrapper').should('have.class', 'entry-wrapper-datapoint-play-newbie')
  })
})
