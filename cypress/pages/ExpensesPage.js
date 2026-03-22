const EXPENSES_ROW_SELECTOR = '.expenses_table tbody tr'

class ExpensesPage {
    //Selectors
    get dateInput() { return cy.get('#addExpenseDate') }
    get mileageInput() { return cy.get('#addExpenseMileage') }
    get litersInput() { return cy.get('#addExpenseLiters') }
    get totalCostInput() { return cy.get('#addExpenseTotalCost') }
    get saveExpenseButton() { return cy.get('.modal-footer .btn-primary') }

    addExpense({ date, mileage, liters, totalCost }) {
        this.dateInput.clear().type(date)
        this.mileageInput.clear().type(mileage)
        this.litersInput.clear().type(liters)
        this.totalCostInput.clear().type(totalCost)
        this.saveExpenseButton.click()
        return this
    }

    getExpenseByMileage(mileage) {
        return cy.contains(EXPENSES_ROW_SELECTOR, mileage)
    }
}

export default new ExpensesPage()