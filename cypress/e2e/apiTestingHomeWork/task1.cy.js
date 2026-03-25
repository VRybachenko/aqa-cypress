import garagePage from '../../pages/GaragePage'
import expensesPage from '../../pages/ExpensesPage'

//********************TESTS*******************//

describe('Garage - API interception', () => {
    beforeEach(() => {
        login()
        cy.deleteAllCars()
    })

    //Test №1
    it('Should intercept POST /api/cars, validate status 201 and save created car id', () => {
        cy.log('Step 1: Open the Garage page')
        garagePage.open()

        cy.log('Step 2: Set up interception for POST /api/cars')
        cy.intercept('POST', '/api/cars').as('createCar')

        cy.log('Step 3: Add a new car with brand, model and mileage')
        garagePage.addCar(CAR.brand, CAR.model, CAR.mileage)

        cy.log('Step 4: Wait for the intercepted request and validate response')
        cy.wait('@createCar').then(({response}) => {
            expect(response.statusCode).to.eq(201)

            const carId = response.body.data.id
            expect(carId).to.be.a('number')

            cy.log(`Created car id: ${carId}`)
            cy.wrap(carId).as('createdCarId')
        })

        cy.log('Step 5: Verify the saved car id is accessible and the car is visible in the garage')
        cy.get('@createdCarId').then((carId) => {
            cy.log(`Saved car id: ${carId}`)
            expect(carId).to.be.greaterThan(0)
        })

        garagePage.getCarByName(CAR.brand, CAR.model).should('be.visible')
    })

    //Test №2
    it('Should validate that GET /api/cars contains the car created via UI with correct data and id from interception', () => {
        cy.log('Step 1: Open the Garage page')
        garagePage.open()

        cy.log('Step 2: Set up interception for POST /api/cars')
        cy.intercept('POST', '/api/cars').as('createCar')

        cy.log('Step 3: Add a new car via UI')
        garagePage.addCar(CAR.brand, CAR.model, CAR.mileage)

        cy.log('Step 4: Get created car id from intercepted response')
        cy.wait('@createCar').then(({response}) => {
            const createdCarId = response.body.data.id

            cy.log('Step 5: Request GET /api/cars and validate the car is in the list')
            cy.request({
                method: 'GET',
                url: '/api/cars',
                auth: {
                    username: Cypress.env('httpBasicAuthUsername'),
                    password: Cypress.env('httpBasicAuthPassword'),
                },
            }).then(({body}) => {
                /** @type {{ id: number, brand: string, model: string, initialMileage: number }} */
                const car = body.data.find((car) => car.id === createdCarId)

                expect(car).to.exist
                expect(car.brand).to.eq(CAR.brand)
                expect(car.model).to.eq(CAR.model)
                expect(car.initialMileage).to.eq(Number(CAR.mileage))
            })
        })
    })
})

describe('Expenses - API', () => {
    beforeEach(() => {
        login()
        cy.deleteAllCars()
    })

    //Test №3
    it('Should create an expense via API and validate status 200 and response body', () => {
        cy.log('Step 1: Open the Garage page and create a car via UI')
        garagePage.open()
        cy.intercept('POST', '/api/cars').as('createCar')
        garagePage.addCar(CAR.brand, CAR.model, CAR.mileage)

        cy.log('Step 2: Get created car id from intercepted response')
        cy.wait('@createCar').then(({response}) => {
            const carId = response.body.data.id

            cy.log('Step 3: Create an expense via API custom command')
            cy.createExpense(carId, EXPENSE).then(({status, body}) => {
                cy.log('Step 4: Validate status code and response body')
                expect(status).to.eq(200)
                expect(body.status).to.eq('ok')

                const data = body.data
                expect(data.id).to.be.a('number')
                expect(data.carId).to.eq(carId)
                expect(data.reportedAt).to.eq(EXPENSE.reportedAt)
                expect(data.mileage).to.eq(EXPENSE.mileage)
                expect(data.liters).to.eq(EXPENSE.liters)
                expect(data.totalCost).to.eq(EXPENSE.totalCost)
            })
        })
    })

    //Test №4
    it('Should validate expense created via API is visible in the UI for the correct car', () => {
        cy.log('Step 1: Open the Garage page and create a car via UI')
        garagePage.open()
        cy.intercept('POST', '/api/cars').as('createCar')
        garagePage.addCar(CAR.brand, CAR.model, CAR.mileage)

        cy.log('Step 2: Get created car id and create an expense via API')
        cy.wait('@createCar').then(({response}) => {
            const carId = response.body.data.id
            cy.createExpense(carId, EXPENSE)

            cy.log('Step 3: Navigate to the expenses page by submitting the add expense form')
            garagePage.open()
            garagePage.openAddExpenseModal(CAR.brand, CAR.model)
            expensesPage.addExpense(UI_EXPENSE)

            cy.log('Step 4: Validate the API-created expense is visible in the expenses table')
            expensesPage.getExpenseByMileage(EXPENSE.mileage).should('be.visible')
        })
    })
})

//***************HELPERS METHOD***************//

//Test data: car to be added to the garage
const CAR = {
    brand: 'Audi',
    model: 'TT',
    mileage: '10000',
}

//Test data: expense to be created via API
const EXPENSE = {
    reportedAt: new Date().toISOString().split('T')[0],
    mileage: 10500,
    liters: 40,
    totalCost: 60,
}

//Test data: expense submitted via UI form to navigate to the expenses page
const today = new Date()
const UI_EXPENSE = {
    date: `${String(today.getDate()).padStart(2, '0')}.${String(today.getMonth() + 1).padStart(2, '0')}.${today.getFullYear()}`,
    mileage: '10001',
    liters: '40',
    totalCost: '60',
}

//Logs in via API request and sets session cookie, then navigates to the app
function login() {
    cy.loginByAPI()
    cy.visit('/')
}