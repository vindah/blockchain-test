import { expect } from '@playwright/test';
import { BasePage } from '../base/base-page.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.jumperLogo = page.locator('#jumper-logo');
    this.exchangeBox = page.getByText('ExchangeFromSelect chain and');
    this.connectBtn = page.getByRole('button', { name: 'Connect', exact: true });
    this.mainMenu = page.getByRole('button', { name: 'Main Menu' });
    this.connectWalletBtn = page.getByRole('button', { name: 'Connect wallet' });
    this.missionsMenuBtn = page.getByTestId('navbar-missions-button');
    this.exchangeMenuBtn = page.getByTestId('navbar-exchange-button');
    
    this.mainMenuOptions = {
        learnMenuText: page.getByRole('link', { name: 'Learn' }),
        scanMenuText: page.getByRole('link', { name: 'Scan' }),
        supportMenuText: page.getByRole('menuitem', { name: 'Support' }),
        xSocialLinkIcon: page.getByRole('link', { name: 'X social link' }),
        discordLinkIcon: page.getByRole('link', { name: 'Discord social link' }),
        telegramLinkIcon: page.getByRole('link', { name: 'Telegram social link' }),
    };

  }

  async assertJumperHomepageVisible() {
    await expect.soft(this.jumperLogo).toBeVisible();
    await expect.soft(this.exchangeBox).toBeVisible();
    await expect.soft(this.connectBtn).toBeVisible();
    await expect.soft(this.mainMenu).toBeVisible();
  }

  async clickOnMenuBtn() {
    await this.mainMenu.click();
  }

  async clickOnConnectWalletBtn() {
    await this.connectWalletBtn.click();
  }

  async navigateToLearnPage() {
    await this.clickOnMenuBtn();
    await this.mainMenuOptions.learnMenuText.click();
  }
}