# Cypress E2E Slack Reporter

This project provides a GitHub Action to run Cypress end-to-end (E2E) tests, generate Mochawesome reports, and send detailed notifications to Slack.

## Features
- Runs Cypress E2E tests automatically in your CI pipeline.
- Generates beautiful Mochawesome HTML and JSON reports.
- Sends a summary of test results to a Slack channel via webhook.
- Customizable Slack bot name, icon, and message title.
- Continues or stops workflow based on test results (configurable).

## Usage

### 1. Requirements
- Node.js 18 or higher (configurable)
- Cypress and Mochawesome as dev dependencies
- A Slack webhook URL (add as a GitHub Secret)

### 2. Example Test
Located at `cypress/e2e/example.cy.js`:
```js
// Example Cypress test
describe('My first test suite', () => {
  it('should always pass', () => {
    expect(true).to.equal(true)
  })

  it('should visit an example site and check the title', () => {
    cy.visit('https://example.cypress.io')
    cy.title().should('include', 'Cypress.io')
  })
})
```

### 3. GitHub Action Inputs
See `action.yml` for all configuration options. Key inputs:
- `node-version`: Node.js version (default: 18)
- `cypress-command`: Cypress run command (default includes Mochawesome reporter)
- `slack-webhook`: **Required.** Your Slack webhook URL (set as a GitHub Secret)
- `slack-username`: Slack bot name (default: CyBot)
- `slack-icon`: Slack bot icon URL
- `slack-title`: Slack message title
- `continue-on-cypress-error`: Continue workflow if tests fail (default: true)

### 4. Example Workflow Step
```yaml
- name: Run Cypress E2E with Slack Notification
  uses: ./
  with:
    slack-webhook: ${{ secrets.SLACK_WEBHOOK }}
```

## Slack Notification Example

This action uses [rtCamp/action-slack-notify@v2](https://github.com/rtCamp/action-slack-notify) to send detailed test results to Slack. Below is an example of the notification step as defined in `action.yml`:

```yaml
- name: Send Slack Notification
  if: always()
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_COLOR: ${{ env.SLACK_DYNAMIC_COLOR }}
    SLACK_USERNAME: ${{ inputs.slack-username }}
    SLACK_ICON: ${{ inputs.slack-icon }}
    SLACK_MESSAGE: |
      📊 Total: *${{ env.TOTAL_TESTS }}*
      ✅ Passed: *${{ env.PASSED_TESTS }}*
      ❌ Failed: *${{ env.FAILED_TESTS }}*
      ⚪️ Skipped: *${{ env.SKIPPED_TESTS }}*
      ⏳ Pending: *${{ env.PENDING_TESTS }}*
      
      🔗 Workflow: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
    SLACK_TITLE: ${{ inputs.slack-title }}
    SLACK_WEBHOOK: ${{ inputs.slack-webhook }}
    SLACK_FOOTER: ''
    MSG_MINIMAL: true
```

**Configuration required:**
- You must create a Slack Incoming Webhook and add it as a GitHub Secret named `SLACK_WEBHOOK`.
- Optionally, you can customize the bot name, icon, and message title using the action inputs.

For more details, see the [rtCamp/action-slack-notify documentation](https://github.com/rtCamp/action-slack-notify).

## Project Structure
- `cypress/` - Cypress test folder
- `cypress/e2e/example.cy.js` - Example test file
- `cypress.config.js` - Cypress configuration
- `action.yml` - GitHub Action definition
- `package.json` - Project dependencies and scripts

## License
MIT