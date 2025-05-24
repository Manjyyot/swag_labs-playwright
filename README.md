# SauceDemo Playwright Automation

This script automates the process of logging into [SauceDemo](https://www.saucedemo.com/), adding every **odd-indexed product** to the cart, and verifying the cart badge count using **Playwright**.

## Features

- Logs into the SauceDemo website using the standard user credentials.
- Adds every odd-indexed inventory item to the shopping cart.
- Waits for and verifies cart badge updates in real-time.
- Outputs the total number of items added and validates the cart badge count.

## Prerequisites

- Node.js installed
- Playwright installed (with support for Chrome)

Install Playwright:

```bash
npm install playwright
```

## Usage

```bash
node sauce_demo_automation.js
```

Ensure Chrome is installed, as the script is configured to launch Chrome (`channel: 'chrome'`).

## Author

Generated using OpenAI's ChatGPT
