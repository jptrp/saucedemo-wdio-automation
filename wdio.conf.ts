import type { Options } from '@wdio/types'

export const config: Options.Testrunner = {
  runner: 'local',
  framework: 'mocha',
  specs: ['./tests/**/*.spec.ts'],
  suites: {
    smoke: ['./tests/smoke/**/*.spec.ts'],
    regression: ['./tests/regression/**/*.spec.ts'],
    e2e: ['./tests/e2e/**/*.spec.ts']
  },
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      acceptInsecureCerts: true,
      'goog:chromeOptions': {
        args: [
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-notifications',
          '--disable-popup-blocking'
        ]
      }
    }
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://www.saucedemo.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
        useCucumberStepReporter: false
      }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  before: () => {
    require('ts-node').register({ files: true })
  },
  afterTest: async function (test, context, { error }) {
    if (error) {
      await browser.takeScreenshot()
    }
  },
  onComplete: function () {
    console.log('\n✅ Test execution completed!')
  }
}
