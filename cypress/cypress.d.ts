/// <reference types="cypress" />
declare global {
    namespace Cypress {
        interface TypeOptions {
            sensitive?: boolean
        }

        interface Chainable {
            login(email: string, password: string): Chainable
        }
    }
}

export {}