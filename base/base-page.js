export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

  async getNewTabAfterClick(clickAction, waitForUrl = null, loadState = 'load') {
    const context = this.page.context();
    
    try {
        const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        clickAction(),
        ]);
        
        await newPage.bringToFront();
        await newPage.waitForLoadState(loadState);
        
        if (waitForUrl) {
        await newPage.waitForURL(waitForUrl, { timeout: 5000 });
        }
        
        return newPage;
    } catch (error) {
        throw new Error(`Failed to handle new tab: ${error.message}`);
    }
 }
}
