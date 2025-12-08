import { expect } from '@playwright/test';
import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress/playwright';

import walletSetup from '../setup/metamask.setup.js';

import { HomePage } from '../pages/home-page.js';
import { LearnPage } from '../pages/learn-page.js';
import { MissionsPage } from '../pages/missions-page.js';

const synpressBase = testWithSynpress(metaMaskFixtures(walletSetup));

const test = synpressBase.extend({
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
test.use({
  baseURL: process.env.UI_URL,
});
export { test, expect };