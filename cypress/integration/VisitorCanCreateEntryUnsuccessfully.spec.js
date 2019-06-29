describe('Visitor can', () => {

  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:create_entry_no_success.json',
      status: 422,
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth/sign_in',
      status: 200,
      response: 'fixture:successful_login_user.json',
      headers: {
        "uid": "carla@mail.com"
      }
    })
    cy.visit('http://localhost:3000')
    cy.get('#map-icon-plus').click()
    cy.get('#login-form').within(() => {
      cy.get('#email').type('carla@mail.com')
      cy.get('#password').type('password')
    })
    cy.get('#login_form_button').click()
    cy.contains('You have succesfully logged in')
    cy.wait(3000)
    cy.get('#map-icon-plus').click()
    cy.get('#caption').type('This is a very long caption and i should get an error message if I write it in the caption field! This is a very long caption and i should get an error message if I write it in the caption field!')
    cy.get('#upload-button').click()
  })

  it('not create post if image is not uploaded and/or caption is over 140 characters long', () => {
    
    let text = [
      'Ooops!', 
      'Caption is too long (maximum is 140 characters)',
      'You need to upload an image',
    ]

    text.forEach(post => {
      cy.contains(post)
    })
  })

  it('not continue creating post without closing error message', () => {
    cy.get('#caption').should('not.be.visible')
    cy.get('#upload-button').should('not.be.visible')
  })

  it('close error message and continue to create a post', () => {
    cy.get('#close-topsidebar-error').click()
    cy.get('#caption').type('This works fine!')
  })
})
