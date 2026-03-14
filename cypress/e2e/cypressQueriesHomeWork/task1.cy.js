describe('Section buttons', () => {
    beforeEach(() => {
        cy.visit('/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
    })

    //Test №1
    it('Should display Sign up button', () => {
        //Step: Verify that "Sign up" button is visible on the page
        cy.contains('button', 'Sign up').should('be.visible')
    })

    //Test №2
    it('Should display all social icons', () => {
        //Step: Define expected social icons
        const socialIcons = [
            'icon-facebook',
            'icon-telegram',
            'icon-youtube',
            'icon-instagram',
            'icon-linkedin'
        ];

        //Step: Verify that social icons container is visible
        cy.get('.contacts_socials').should('be.visible');

        //Step: Check that each social icon is visible
        cy.get('.contacts_socials').within(() => {
            socialIcons.forEach((icon) => {
                cy.log(`Checking ${icon}`)
                cy.get(`.${icon}`).should('be.visible');
            });
        });
    });

    //Test №3
    it('Should display contact links in footer', () => {
        //Step: Define expected contact links
        const contactLinks = [
            'https://ithillel.ua',
            'mailto:developer@ithillel.ua'
        ]

        //Step: Verify that each contact link exists and is visible
        contactLinks.forEach(link => {
            cy.log(`Checking ${link}`)
            cy.get(`a[href="${link}"]`)
                .should('exist')
                .and('be.visible')
        })
    })
})