describe('Visitor can', () => {
  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:create_post_success.json'
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts/1',
      response: 'fixture:full_post.json',
      status: 200
    })
    cy.visit('http://localhost:3000')
    cy.get('#map-icon-plus').click()
  })

  it('create post successfully', () => {

    cy.contains('Upload you post!')

    let form = [
      ["#caption", "Swedenborgsgatan great summer street!"]
    ]

    form.forEach(element => {
      cy.get(element[0]).type(element[1])
    })
    cy.get('#play').should('have.class', 'active')
    cy.get('#work').click().should('have.class', 'active')
    cy.get('#upload-button').click()

    let text = ["Thank you for sharing your picture! Your post will soon be uploaded!"]

    text.forEach(contain => {
      cy.contains(contain)
    })
  })
})
