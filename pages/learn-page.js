import { expect } from '@playwright/test';

export class LearnPage {
  constructor(page) {
    this.recentPostHeaderText = page.getByText('Recent Posts');
    this.joinDiscordBtn = page.getByRole('link', { name: 'Join our Discord to learn' });
    this.partnershipsSection = page.locator('#Partnerships');
    this.tutorialsSection = page.locator('#Tutorial');
    this.announcementsSection = page.locator('#Announcements');
    this.knowledgeSection = page.locator('#Knowledge');
  }

  async assertJumperLearnPageVisible() {
    await expect.soft(this.recentPostHeaderText).toBeVisible();
    await expect.soft(this.joinDiscordBtn).toBeVisible();
    await expect.soft(this.partnershipsSection).toBeVisible();
    await expect.soft(this.tutorialsSection).toBeVisible();
    await expect.soft(this.announcementsSection).toBeVisible();
    await expect.soft(this.knowledgeSection).toBeVisible();
  }

  async clickOnMenuBtn() {
    await this.mainMenu.click();
  }
}