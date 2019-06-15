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
    cy.get('#plus').click()
  })

  it('create post successfully', () => {

    cy.contains('Upload you post!')

    let form = [
      ["#image", "https://antoniaangeliqa.files.wordpress.com/2015/08/dsc08700.jpg"],
      ["#caption", "Swedenborgsgatan great summer street!"],
    ]

    form.forEach(element => {
      cy.get(element[0]).type(element[1])
    })

    cy.get('#work-play').click('play')
    cy.get('#submit').click()

    let text = ["Swedenborgsgatan great summer street!", "Thank you for sharing your picture! Your post will soon be uploaded!"]

    text.forEach(contain => {
      cy.contains(contain)
    })
  })
})
