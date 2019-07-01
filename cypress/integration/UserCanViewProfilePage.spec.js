describe('User can', () => {

  beforeEach(function () {
    cy.server()
  })

  it('view user page', () => {
    cy.login('fixture:successful_login_user.json', 'carla@mail.com', 'password', 200)
    cy.wait(3000)
    cy.get('#profile-icon').click()
    cy.contains('We’d love to find out more about you and how to stay in touch')
    cy.get('.submit-button').click()
  })

  it('not view profile page if not logged in', () => {
    cy.visit('http://localhost:3000')
    cy.get('#profile-icon').click()
    cy.contains('We’d love to find out more about you and how to stay in touch').should('not.exist')
  })
})