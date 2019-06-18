describe('Visitor can', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:create_post_no_success.json',
      status: 422
    })
    cy.visit('http://localhost:3000')
    cy.get('#map-icon-plus').click()
  })

  it('not create post if image is not uploaded and/or caption is over 140 characters long', () => {

    cy.contains('Upload you post!')
    cy.contains('Images must have geotaging infomration available. If not, you can use an online service')
    cy.get('#caption').type('This is a very long caption and i should get an error message if I write it in the caption field! This is a very long caption and i should get an error message if I write it in the caption field!')
    cy.get('#upload-button').click()
  })
})
