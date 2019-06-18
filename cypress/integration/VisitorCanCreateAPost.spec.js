describe('Visitor can', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:create_post_success.json',
      status: 200
    })
  //  cy.route({
   //   method: 'POST',
   //   url: 'http://localhost:3002/api/v1/posts',
  //    response: 'fixture:kittens.jpg',
  //    status: 200
//    })
    cy.visit('http://localhost:3000')
    cy.get('#map-icon-plus').click()
  })

  it('create post successfully', () => {

    cy.contains('Upload you post!')
    cy.contains('Images must have geotaging infomration available. If not, you can use an online service')
    cy.get('#caption').type('Swedenborgsgatan great summer street!')
    cy.get('#play').should('have.class', 'active')
    cy.get('#upload-button').click()
    cy.contains('Thank you for sharing your picture! Your post is sent for review and will soon be uploaded!')
  })

  it('not create post if image is not uploaded and/or caption is over 140 characters long', () => {

    cy.contains('Upload you post!')
    cy.contains('Images must have geotaging infomration available. If not, you can use an online service')
    cy.get('#caption').type('This is a very long caption and i should get an error message if I write it in the caption field! This is a very long caption and i should get an error message if I write it in the caption field!')
    cy.get('#upload-button').click()
  })
})