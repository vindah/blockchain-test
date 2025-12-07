import { expect } from '@playwright/test';
import { BasePage } from '../base/base-page.js';
import { isMobile } from '../utils/device-helper.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.jumperLogo = page.locator('#jumper-logo');
    this.exchangeBox = page.getByText('ExchangeFromSelect chain and');
    this.connectBtn = page.getByRole('button', { name: 'Connect', exact: true });
    this.mainMenu = page.getByRole('button', { name: 'Main Menu' });
    this.connectWalletBtn = page.getByRole('button', { name: 'Connect wallet' });
    this.exchangeMenuBtn = page.getByTestId('navbar-exchange-button');
    this.getStartedBtn = page.getByRole('button', { name: 'Open welcome screen' })
    
    this.mainMenuOptions = {
        learnMenuText: page.getByRole('link', { name: 'Learn' }),
        scanMenuText: page.getByRole('link', { name: 'Scan' }),
        supportMenuText: page.getByRole('menuitem', { name: 'Support' }),
        xSocialLinkIcon: page.getByRole('link', { name: 'X social link' }),
        discordLinkIcon: page.getByRole('link', { name: 'Discord social link' }),
        telegramLinkIcon: page.getByRole('link', { name: 'Telegram social link' }),
    };

    this.addWalletModal = {
        headerText: page.getByText('Select a wallet'),
        walletModal: page.locator('#widget-wallet-modal-content'),
        walletCards: page.locator('div[class*="MuiPaper-elevation1 MuiCard-root mui-udv5zg"]'),
        metaMaskDesktopTab: page.getByText('Desktop'),
    };
    this.metaMaskGetStartedBtn = this.addWalletModal.walletCards
    .filter({ hasText: 'MetaMask' })
    .getByText('Get Started');

  }

  getMissionsMenuBtn(testInfo) {
    return isMobile(testInfo)
        ? this.page.getByRole('link', { name: 'Missions' })
        : this.page.getByTestId('navbar-missions-button');
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

  async getWalletCardCount() {
    return await this.addWalletModal.walletCards.count();
  }

  async navigateToLearnPage() {
    await this.clickOnMenuBtn();
    await this.mainMenuOptions.learnMenuText.click();
  }

  async navigateToDiscordPageAndValidate() {
    await this.clickOnMenuBtn();
    const discordTab = await this.getNewTabAfterClick(
      () => this.mainMenuOptions.discordLinkIcon.click()
    );
    
    expect.soft(discordTab.url()).toContain('discord.com');
  }

  async checkAllWalletsVisible() {
    const expectedNames = [
        'Abstract',
        'WalletConnect',
        'MetaMask',
        'Coinbase Wallet',
        'Base Account',
        'Porto'
    ];
    const walletCount = await this.getWalletCardCount();
    for (let i = 0; i < walletCount; i++) {
      await expect.soft(this.addWalletModal.walletCards.nth(i)).toBeVisible();
      await expect.soft(this.addWalletModal.walletCards.nth(i)).toContainText(expectedNames[i]);
    }
  }
}