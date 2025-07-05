const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}' // Busca los tests en esta ruta
  },
  projectId: "your-project-id" // Puedes poner cualquier ID o el tuyo si usas Cypress Dashboard
})