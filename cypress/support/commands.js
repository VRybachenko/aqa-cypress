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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    //Step 1: Open Sign In modal
    cy.contains('button', 'Sign In').click()

    //Step 2: Enter email
    cy.get('#signinEmail').type(email)

    //Step 3: Enter password
    cy.get('#signinPassword').type(password, { sensitive: true })

    //Step 4: Click Login button
    cy.contains('button', 'Login').click()

    //Step 5: Verify successful login
    cy.contains('Garage').should('be.visible')
})

Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
    if (options.sensitive) {
        options.log = false

        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(String(text).length),
        })
    }
    return originalFn(element, text, options)
})