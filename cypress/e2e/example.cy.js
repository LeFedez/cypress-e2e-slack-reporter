// cypress/e2e/example.cy.js
describe('Mi primera suite de pruebas', () => {
  it('debería pasar siempre', () => {
    expect(true).to.equal(true)
  })

  it('debería visitar un sitio web de ejemplo y verificar el título', () => {
    cy.visit('https://example.cypress.io')
    cy.title().should('include', 'Cypress.io')
  })
})