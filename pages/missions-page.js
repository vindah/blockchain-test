import { expect } from '@playwright/test';

export class MissionsPage {
  constructor(page) {
    this.missionsBox = page.locator('div').filter({ hasText: 'MissionsExplore 2' }).nth(1);
    this.missionsHeaderText = page.getByText('Missions').nth(1);
  }

  async assertJumperLearnPageVisible() {
    await expect.soft(this.missionsBox).toBeVisible();
    await expect.soft(this.missionsHeaderText).toBeVisible();
  }
}