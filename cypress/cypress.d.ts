/// <reference types="cypress" />
declare global {
    namespace Cypress {
        interface TypeOptions {
            sensitive?: boolean
        }

        interface Chainable {
            login(email: string, password: string): Chainable
            loginByAPI(): Chainable<void>
            deleteAllCars(): Chainable
            createExpense(carId: number, expense: { reportedAt: string, mileage: number, liters: number, totalCost: number }): Chainable<Cypress.Response<unknown>>
        }
    }
}

export {}