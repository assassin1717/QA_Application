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
require('dotenv').config();

Cypress.Commands.add('fillInput', (selector, text) => {
    cy.get(selector).clear()
    if (text.length > 0)
        cy.get(selector).type(text)
})

Cypress.Commands.add('extractChartData', () => {
    cy.get('#R12602632517025750547_jet').then((chart) => {
        const chartData = [];
        for (let i = 2; i <= 5; i++) {
            const svgElement = chart[0].querySelector(`#R12602632517025750547_jet > svg:nth-child(2) > g > g > g:nth-child(1) > g:nth-child(2) > g:nth-child(${i})`);

            const dots = svgElement.querySelectorAll(i === 2 ? 'path' : i > 3 ? 'polygon' : 'circle');

            const dotsData = [];
            dots.forEach((dot) => {
                cy.wrap(dot).click({ force: true });
                cy.get(dot).then(($element) => {
                    const ariaLabel = $element.attr('aria-label');
                    dotsData.push(ariaLabel);
                });
            });

            chartData.push(dotsData);
        }

        return chartData;
    });
});