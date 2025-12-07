import { expect } from '@playwright/test';
import { BasePage } from '../base/base-page.js';

export class MissionsPage extends BasePage {
  constructor(page) {
    super(page);
    this.missionsBox = page.locator('div').filter({ hasText: 'MissionsExplore 2' }).nth(1);
    this.missionsHeaderText = page.getByText('Missions').nth(1);
  }

  async assertMissionsPageVisible() {
    await expect.soft(this.missionsBox).toBeVisible();
    await expect.soft(this.missionsHeaderText).toBeVisible();
  }
}