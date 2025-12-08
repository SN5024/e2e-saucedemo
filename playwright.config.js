import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

export default defineConfig({
  testDir: './tests',

  // --- Workers Optimized for Apple M2 Pro ---
  workers: process.env.CI ? 4 : 6, 
  timeout: 30_000,
  fullyParallel: true, 

  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // --- Browsers to Test ---
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ],

  // --- Reporters ---
  reporter: [
    ['list'], // console output
    ['html', { open: 'never' }], 
    ['allure-playwright', { outputFolder: 'allure-results' }] // <<--- ADD THIS
  ],

  expect: {
    timeout: 5000
  }
});