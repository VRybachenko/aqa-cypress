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
    cy.get('body').then(($body) => {
        if ($body.find('button:contains("Sign In")').length === 0) return

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
})

Cypress.Commands.add('loginByAPI', () => {
    const { username, password, httpBasicAuthUsername, httpBasicAuthPassword } = Cypress.env()

    cy.request({
        method: 'POST',
        url: '/api/auth/signin',
        auth: { username: httpBasicAuthUsername, password: httpBasicAuthPassword },
        body: { email: username, password: password, remember: false },
    }).then(({ headers }) => {
        const cookieParams = headers['set-cookie'][0].split('; ')
        const name = cookieParams[0].split('=')[0]
        const value = cookieParams[0].split('=')[1]
        const domain = cookieParams[1].split('=')[1]
        const expiry = Math.floor(new Date(cookieParams[3].split('=')[1]).getTime() / 1000)
        cy.setCookie(name, value, { domain, path: '/', expiry })
    })
})

Cypress.Commands.add('deleteAllCars', () => {
    const { httpBasicAuthUsername, httpBasicAuthPassword } = Cypress.env()

    cy.request({
        method: 'GET',
        url: '/api/cars',
        auth: { username: httpBasicAuthUsername, password: httpBasicAuthPassword },
    }).then(({ body }) => {
        body.data.forEach(({ id }) => {
            cy.request({
                method: 'DELETE',
                url: `/api/cars/${id}`,
                auth: { username: httpBasicAuthUsername, password: httpBasicAuthPassword },
            })
        })
    })
})

Cypress.Commands.add('createExpense', (carId, expense) => {
    return cy.request({
        method: 'POST',
        url: '/api/expenses',
        auth: {
            username: Cypress.env('httpBasicAuthUsername'),
            password: Cypress.env('httpBasicAuthPassword'),
        },
        body: {
            carId,
            reportedAt: expense.reportedAt,
            mileage: expense.mileage,
            liters: expense.liters,
            totalCost: expense.totalCost,
            forceMileage: false,
        },
    })
})

Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
    const basicAuthUsername = Cypress.env('httpBasicAuthUsername')
    const basicAuthPassword = Cypress.env('httpBasicAuthPassword')

    if (basicAuthUsername && basicAuthPassword) {
        options.auth = { username: basicAuthUsername, password: basicAuthPassword }
    }

    return originalFn(url, options)
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