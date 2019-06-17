describe('Visitor can view on the map', () => {

  it('datapoints of posts with correct coordinates', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.visit('http://localhost:3000')

    let posts = [
      "#post_1","#post_2", "#post_3","#post_4", "#post_5"
    ]

    posts.forEach(post => {
      cy.get(post).should('be.visible')
      })
    })

    //Test that we find datapoints on the map (cy.get the correct Div Id?)
    //Test that datapoints are in the right position on the map?
    //Test that datapoints have the right color, based on category?

})
