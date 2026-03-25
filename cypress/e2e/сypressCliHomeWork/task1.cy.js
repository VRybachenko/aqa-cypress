import garagePage from '../../pages/GaragePage'
import expensesPage from '../../pages/ExpensesPage'

//********************TESTS*******************//

describe('Garage', () => {
    beforeEach(() => {
        login()
        cy.deleteAllCars()
    })

    //Test №1
    it('Should add a car to the garage', () => {
        cy.log('Step 1: Open the Garage page')
        garagePage.open()

        cy.log('Step 2: Add a new car with brand, model and mileage')
        garagePage.addCar(CAR.brand, CAR.model, CAR.mileage)

        cy.log('Step 3: Verify the car appears in the garage list')
        garagePage.getCarByName(CAR.brand, CAR.model).should('be.visible')
    })
})

describe('Fuel Expenses', () => {
    before(() => {
        login()
        cy.deleteAllCars()
        garagePage.open()
        garagePage.addCar(CAR.brand, CAR.model, CAR.mileage)
    })

    beforeEach(login)

    //Test №2
    it('Should add a fuel expense to the created car', () => {
        cy.log('Step 1: Open the Garage page')
        garagePage.open()

        cy.log('Step 2: Open the Add Expense modal for the car')
        garagePage.openAddExpenseModal(CAR.brand, CAR.model)

        cy.log('Step 3: Fill in and submit the expense form')
        expensesPage.addExpense(EXPENSE)

        cy.log('Step 4: Verify the expense appears in the expenses table')
        expensesPage.getExpenseByMileage(EXPENSE.mileage).should('be.visible')
    })
})

//***************HELPERS METHOD***************//

//User credentials from Cypress environment variables
const { username, password } = Cypress.env()

//Test data: car to be added to the garage
const CAR = {
    brand: 'Audi',
    model: 'TT',
    mileage: '10000',
}

//Test data: fuel expense (date is generated dynamically to always match today)
const today = new Date()
const EXPENSE = {
    date: `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`,
    mileage: '10500',
    liters: '40',
    totalCost: '60',
}

//Navigates to the app and logs in with credentials from env
function login() {
    cy.visit('/')
    cy.login(username, password)
}