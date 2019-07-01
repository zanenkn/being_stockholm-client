describe('User can log in', () => {

  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
    })
  })

  it('successfully', () => {
    cy.login('fixture:successful_login_user.json', 'carla@mail.com', 'password', 200)
    cy.contains('You have succesfully logged in')
  })

  it('with invalid credentials', () => {
    cy.login('fixture:unsuccessful_login.json', 'carla@mail.com', 'wrongpassword', 401)
    cy.contains('Invalid login credentials. Please try again.')
  })
})