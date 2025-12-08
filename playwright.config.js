// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: process.env.BASE_URL,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      outputDir: 'test-results/chromium',
      reporter: [['html', { outputFolder: 'playwright-report/chromium', open: 'never' }]],
    },
    {
      name: 'webkit', // Safari
      use: { ...devices['Desktop Safari'] },
      outputDir: 'test-results/webkit',
      reporter: [['html', { outputFolder: 'playwright-report/webkit', open: 'never' }]],
    },
  ],
});