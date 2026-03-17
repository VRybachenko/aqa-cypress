describe('Registration validation tests', () => {
    const fillRegistrationForm = (
        name = 'Tony',
        lastName = 'Stark',
        email = `Tony+${Date.now()}@starkindustries.com`,
        password = 'Password1',
        repeatPassword = 'Password1'
    ) => {
        cy.get('#signupName').type(name)
        cy.get('#signupLastName').type(lastName)
        cy.get('#signupEmail').type(email)
        cy.get('#signupPassword').type(password, { sensitive: true })
        cy.get('#signupRepeatPassword').type(repeatPassword, { sensitive: true })
    }

    beforeEach(() => {
        //Step 1: Open application with Basic Auth
        cy.visit('/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })

        //Step 2: Open Sign up modal
        cy.contains('button', 'Sign up').click()

        //Step 3: Verify registration modal is visible
        cy.contains('Registration').should('be.visible')
    })

    it('Test #1 - should validate Name field', () => {
        //Step 1: Verify Name is required
        cy.get('#signupName').click().blur()
        cy.contains('Name required').should('be.visible')
        checkInvalidField('#signupName')

        //Step 2: Enter too short Name
        cy.get('#signupName').clear().type('J').blur()
        cy.contains('Name has to be from 2 to 20 characters long').should('be.visible')
        checkInvalidField('#signupName')

        //Step 3: Enter invalid Name
        cy.get('#signupName').clear().type('John1').blur()
        cy.contains('Name is invalid').should('be.visible')
        checkInvalidField('#signupName')

        //Step 4: Enter Name with spaces
        cy.get('#signupName').clear().type('  John  ').blur()
        cy.get('#signupName').invoke('val').then((value) => {
            expect(String(value).trim()).to.eq('John')
        })
    })

    it('Test #2 - should validate Last name field', () => {
        //Step 1: Verify Last name is required
        cy.get('#signupLastName').click().blur()
        cy.contains('Last name required').should('be.visible')
        checkInvalidField('#signupLastName')

        //Step 2: Enter too short Last name
        cy.get('#signupLastName').clear().type('D').blur()
        cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible')
        checkInvalidField('#signupLastName')

        //Step 3: Enter invalid Last name
        cy.get('#signupLastName').clear().type('Doe1').blur()
        cy.contains('Last name is invalid').should('be.visible')
        checkInvalidField('#signupLastName')

        //Step 4: Enter Last name with spaces
        cy.get('#signupLastName').clear().type('  Doe  ').blur()
        cy.get('#signupLastName').invoke('val').then((value) => {
            expect(String(value).trim()).to.eq('Doe')
        })
    })

    it('Test #3 - should validate Email field', () => {
        //Step 1: Verify Email is required
        cy.get('#signupEmail').click().blur()
        cy.contains('Email required').should('be.visible')
        checkInvalidField('#signupEmail')

        //Step 2: Enter invalid Email
        cy.get('#signupEmail').clear().type('wrongEmail').blur()
        cy.contains('Email is incorrect').should('be.visible')
        checkInvalidField('#signupEmail')
    })

    it('Test #4 - should validate Password field', () => {
        //Step 1: Verify Password is required
        cy.get('#signupPassword').click().blur()
        cy.contains('Password required').should('be.visible')
        checkInvalidField('#signupPassword')

        //Step 2: Enter invalid Password
        cy.get('#signupPassword').clear().type('123').blur()
        cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, ' +
            'one capital, and one small letter').should('be.visible')
        checkInvalidField('#signupPassword')
    })

    it('Test #5 - should validate Re-enter password field', () => {
        //Step 1: Verify Re-enter password is required
        cy.get('#signupRepeatPassword').click().blur()
        cy.contains('Re-enter password required').should('be.visible')

        //Step 2: Enter different passwords
        cy.get('#signupPassword').clear().type('Password1')
        cy.get('#signupRepeatPassword').clear().type('Password2').blur()
        cy.contains('Passwords do not match').should('be.visible')

        //Step 3: Verify Register button remains disabled
        cy.contains('button', 'Register').should('be.disabled')
    })

    it('Test #6 - should validate Register button', () => {
        //Step 1: Verify Register button is disabled when form is invalid
        cy.get('#signupName').type('J').blur()
        cy.contains('button', 'Register').should('be.disabled')

        //Step 2: Refresh page and reopen registration modal
        cy.visit('/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
        cy.contains('button', 'Sign up').click()
        cy.contains('Registration').should('be.visible')

        //Step 3: Fill form with valid data
        fillRegistrationForm()

        //Step 4: Verify Register button is enabled
        cy.contains('button', 'Register').should('not.be.disabled')
    })

    it('Test #7 - should register user successfully', () => {
        //Step 1: Fill registration form with valid data
        fillRegistrationForm()

        //Step 2: Click Register button
        cy.contains('button', 'Register')
            .should('not.be.disabled')
            .click()

        //Step 3: Verify Garage page is displayed
        cy.contains('Garage').should('be.visible')
    })

    it('Test #8 - should login via custom command after user registration', () => {
        const email = `Tony+${Date.now()}@starkindustries.com`
        const password = 'Password1'

        //Step 1: Fill registration form with valid data
        fillRegistrationForm('Tony', 'Stark', email, password, password)

        //Step 2: Click Register button
        cy.contains('button', 'Register')
            .should('not.be.disabled')
            .click()

        //Step 3: Verify user is logged in after registration
        cy.contains('Garage').should('be.visible')

        //Step 4: Open user menu
        cy.get('#userNavDropdown').click()

        //Step 5: Click Logout button
        cy.contains('button', 'Logout').click()

        //Step 6: Verify user is logged out
        cy.contains('button', 'Sign In').should('be.visible')

        //Step 7: Login via custom command
        cy.login(email, password)
    })
})

//***************HELPERS METHOD***************//

const checkInvalidField = (selector) => {
    cy.get(selector).should('have.css', 'border-color')
}