import { expect, test } from '../../base/fixture.js';
import { UI_URL } from '../../playwright.config.js';

test.describe('Jumper Exchange Tests', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.navigateTo(UI_URL);
    await homePage.assertJumperHomepageVisible();
  });

  test('validate that user can switch to missions tab', async ({ homePage, missionsPage }) => {
    await homePage.missionsMenuBtn.click();
    await missionsPage.assertMissionsPageVisible();
  });

  test('validate that user can view learn page', async ({ homePage, learnPage }) => {
    await homePage.navigateToLearnPage();
    await learnPage.assertLearnPageVisible();
  });
});