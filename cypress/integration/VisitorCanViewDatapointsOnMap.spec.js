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

  it('datapoints of posts', () => {

    let posts = [
      "#post_1","#post_2", "#post_3","#post_4", "#post_5"
    ]

    posts.forEach(post => {
      cy.get(post).should('be.visible')
      })
    })

    it('datapoints in different category colors', () => {

      let work = [
        "#post_1", "#post_3", "#post_5"
      ]
      
      let play = [
        "#post_2", "#post_4"
      ]

      work.forEach(post => {
        cy.get(post).should('have.class', 'teal')
        })

      play.forEach(post => {
        cy.get(post).should('have.class', 'yellow')
        })
    })
  
    //Test that we find datapoints on the map (cy.get the correct Div Id?)
    //Test that datapoints are in the right position on the map?
    //Test that datapoints have the right color, based on category?

})
