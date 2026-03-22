class GaragePage {
    //Selectors
    get addCarButton() { return cy.get('.btn.btn-primary').contains('Add car') }
    get brandSelect() { return cy.get('#addCarBrand') }
    get modelSelect() { return cy.get('#addCarModel') }
    get mileageInput() { return cy.get('#addCarMileage') }
    get saveCarButton() { return cy.get('.modal-footer .btn-primary') }

    open() {
        cy.visit('/panel/garage')
        return this
    }

    addCar(brand, model, mileage) {
        this.addCarButton.click()
        this.brandSelect.select(brand)
        this.modelSelect.select(model)
        this.mileageInput.clear().type(mileage)
        this.saveCarButton.click()
        return this
    }

    getCarByName(brand, model) {
        return cy.contains('.car_name', `${brand} ${model}`).closest('.car-item')
    }

    openAddExpenseModal(brand, model) {
        this.getCarByName(brand, model)
            .find('.car_add-expense')
            .click()
        return this
    }
}

export default new GaragePage()