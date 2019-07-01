// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (fixture = {}, email, password, status) => {
  cy.route({
    method: 'POST',
    url: 'http://localhost:3002/api/v1/auth/sign_in',
    status: status,
    response: fixture,
    headers: {
      "uid": email,
    }
  })
  cy.visit('http://localhost:3000')
  cy.get('#profile-icon').click()
  cy.get('#login-form').within(() => {
    cy.get('#email').type(email)
    cy.get('#password').type(password)
  })
  cy.get('#login_form_button').click()
})
