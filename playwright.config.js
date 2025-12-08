import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,
  use: {
    headless: true,
    baseURL: process.env.BASE_URL,
    // Force screenshots/videos for all runs so test-results folders exist
    screenshot: 'on',
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      outputDir: 'test-results/chromium',
      reporter: [['html', { outputFolder: 'playwright-report/chromium', open: 'never' }]],
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      outputDir: 'test-results/webkit',
      reporter: [['html', { outputFolder: 'playwright-report/webkit', open: 'never' }]],
    },
  ],

});