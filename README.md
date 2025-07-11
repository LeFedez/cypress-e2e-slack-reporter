# Cypress E2E Slack Reporter

[![Project Status: Active](https://img.shields.io/badge/status-active-brightgreen)](https://github.com/your-org/cypress-e2e-slack-reporter)

A GitHub Action to run Cypress end-to-end (E2E) tests, generate Mochawesome JSON reports, and send a summary of results to Slack. Designed for easy CI integration and clear team notifications.

---

## Quick Start

Add this to `.github/workflows/cypress-e2e.yml`:

```yaml
on: [push, pull_request]
jobs:
  cypress-e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Cypress E2E with Slack Notification
        uses: ./
        with:
          slack-webhook: ${{ secrets.SLACK_WEBHOOK }}
```

**Requirements:**
- Node.js 18+
- Cypress & Mochawesome as dev dependencies
- Slack webhook URL (as GitHub Secret)

---

## Configuration

Key inputs (see `action.yml` for all):
- `slack-webhook` (**required**): Slack Incoming Webhook URL (GitHub Secret)
- `node-version`: Node.js version (default: 18)
- `cypress-command`: Custom Cypress run command
- `slack-username`, `slack-icon`, `slack-title`: Customize Slack bot/message
- `continue-on-cypress-error`: Continue workflow if tests fail (default: true)

---

## Slack Notification

After running your tests, this action posts a summary to Slack using [rtCamp/action-slack-notify](https://github.com/rtCamp/action-slack-notify). Example message includes:

- Total, passed, failed, skipped, and pending tests
- Workflow link
- Customizable bot name, icon, and title

**To enable:**
1. Create a Slack Incoming Webhook and add it as `SLACK_WEBHOOK` secret.
2. Optionally, set other inputs to personalize the notification.

---

## Troubleshooting
- Ensure `package-lock.json` exists for `npm ci`, or the action will use `npm install`.
- Double-check your Slack webhook and GitHub Secret.
- File upload to Slack is disabled by default for security.
- Set `continue-on-cypress-error: true` to avoid workflow failure on test errors.

---

## Advanced: Hashicorp Vault

You can retrieve the Slack webhook from Hashicorp Vault by setting `VAULT_ADDR` and `VAULT_TOKEN` as secrets. See [rtCamp/action-slack-notify docs](https://github.com/rtCamp/action-slack-notify#hashicorp-vault-optional) for details.

---

## Project Structure
- `action.yml` – Action definition
- `cypress/` – Cypress tests
- `cypress.config.js` – Cypress config
- `package.json` – Dependencies/scripts

## License
MIT