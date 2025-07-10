// cypress/e2e/example.cy.js
// Example Cypress test file
describe('My first test suite', () => {
  it('should always pass', () => {
    expect(true).to.equal(true)
  })

  it('should visit an example website and check the title', () => {
    cy.visit('https://example.cypress.io')
    cy.title().should('include', 'Cypress.io')
  })
})