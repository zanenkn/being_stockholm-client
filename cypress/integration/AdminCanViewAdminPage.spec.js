describe('Admin can', () => {

  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
      status: 200
    })
    
    cy.login('fixture:successful_login_admin.json', 'yatwan@mail.com', 'password', 200)
    cy.wait(3000)
  })

  it('see the Admin link in the menu', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#admin-link').should('be.visible')
  })

  it('be redirected to Admin page and see unpublished entries on the map', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#admin-link').click()

    let pending = [
      '#2', '#5'
    ]

    let published = [
      '#1', '#3'
    ]

    pending.forEach(entry => {
      cy.get(entry).should('be.visible')
    })

    published.forEach(entry => {
      cy.get(entry).should('not.be.visible')
    })
  })
})
