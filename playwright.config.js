// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

export default defineConfig({
  testDir: './tests',

  // --- Workers Optimized for Apple M2 Pro ---
  workers: process.env.CI ? 4 : 6, 
  // Local: 6 workers (best balance for M2 Pro)
  // CI: 4 workers (safe for cloud runners)

  timeout: 30_000,
  fullyParallel: true, // allows files to run parallel unless marked serial

  // --- Run tests inside a file serially ---
  // Prevents shared-state issues like cart count mismatch
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // --- Browsers to Test ---
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],

  // --- Useful for debugging slow tests ---
  reporter: [
    ['list'],
    ['html', { open: 'never' }]
  ],

  // --- The important part: force all tests in a file to run serially ---
  // Add this to avoid parallel conflicts inside the same spec.
  expect: {
    timeout: 5000
  }
});