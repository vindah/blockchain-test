import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home-page.js';
import { LearnPage } from '../pages/learn-page.js';
import { MissionsPage } from '../pages/missions-page.js';

const test = base.extend({
    
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
    learnPage: async ({ page }, use) => {
    await use(new LearnPage(page));
  },
    missionsPage: async ({ page }, use) => {
    await use(new MissionsPage(page));
  },
});

export { test, expect };