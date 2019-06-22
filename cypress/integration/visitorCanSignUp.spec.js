describe('User can sign up', () => {

  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
    })
  })

  it('successfully', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth',
      status: 200,
      response: 'fixture:successful_signup.json'
    })
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.get('#sign_up_link').click()
    cy.get('#signup-form').within(() => {

      let text = [
        ['#email', 'zane@mail.com'],
        ['#password', 'password'],
        ['#password_confirmation', 'password']
        ]
        
        text.forEach(post => {
          cy.get(post[0]).type(post[1])
        })
      })

    cy.get('#newbie').click()
    cy.get('#sign_up_button').click()
    cy.contains('You have succesfully created an account!')
  })

  it('and gets error message if email is not valid and/or passwords do not match', () => {
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth',
      status: 422,
      response: 'fixture:unsuccessful_signup.json',
    })
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.get('#sign_up_link').click()
    cy.get('#signup-form').within(() => {

      let text = [
      ['#email', 'boa@'],
      ['#password', 'pass'],
      ['#password_confirmation', 'password']
      ]

      text.forEach(post => {
        cy.get(post[0]).type(post[1])
      })
    })

    cy.get('#sign_up_button').click()
    cy.contains("Password confirmation doesn't match Password")

    let text = [
      'Password is too short (minimum is 6 characters',
      'Email is not an email',
      "Level can't be blank",
      ]

      text.forEach(post => {
        cy.contains(post)
      })
    })
})