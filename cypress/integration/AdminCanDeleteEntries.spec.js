describe('Admin can delete an entry and', () => {

  beforeEach(function () {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_entries.json',
      status: 200
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts/3',
      response: 'fixture:view_single_entry.json',
      status: 200
    })

    cy.route({
      method: 'DELETE',
      url: 'http://localhost:3002/api/v1/posts/2',
      status: 200,
      response: 'fixture:successful_delete_from_admin.json',
      headers: {
        "uid": "yatwan@mail.com"
      }
    })
    cy.login('fixture:successful_login_admin.json', 'yatwan@mail.com', 'password', 200)
    cy.wait(3000)
  })

  it('by clicking on the delete button on an Entry', () => {
      cy.get('#3').click()
      cy.contains('Midsommar')
      cy.get('#delete-button').click()
      cy.contains('Are you sure?')
      cy.get('#confirm-delete-button').click()
      cy.contains('Midsommar').should('not.exist')
  })
})