describe('Cypress initial setup', () => {
    it('should open the Cypress example page', () => {
        cy.visit('/');
        cy.contains('Kitchen Sink').should('be.visible');
    });
});