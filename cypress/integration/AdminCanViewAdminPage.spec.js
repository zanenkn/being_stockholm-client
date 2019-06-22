describe('Admin can', () => {
  
  beforeEach(function () {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/posts',
      response: 'fixture:list_of_posts.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'http://localhost:3002/api/v1/auth/sign_in',
      status: 200,
      response: 'fixture:successful_login_admin.json',
      headers: {
        "uid": "yatwan@mail.com"
      }
    })
    cy.visit('http://localhost:3000')
  })

  it('see the Admin link in the menu', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#admin').should('be.visible')
  })


  it('be redirected to Admin page and see unpublished posts on the map', () => {
    cy.get('#footer-menu-icon').click()
    cy.get('#admin').click()

    let pending = [
      '#post_2', '#post_4', '#post_5'
    ]

    let published = [
      '#post_1', '#post_3'
    ]

    pending.forEach(post => {
      cy.get(post).should('be.visible')
    })

    published.forEach(post => {
      cy.get(post).should('not.be.visible')
    }) 
  })  
})
