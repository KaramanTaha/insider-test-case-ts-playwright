import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Maximize browser window to fullscreen
   */
  async maximizeWindow(): Promise<void> {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  /**
   * Accept cookies if cookie banner is present
   */
  async acceptCookies(): Promise<void> {
    try {
      // Common cookie accept button selectors
      const cookieSelectors = [
        '[data-cy="cookie-accept"]',
        '[id*="cookie"] button:has-text("Accept")',
        '[class*="cookie"] button:has-text("Accept")',
        'button:has-text("Accept All")',
        'button:has-text("Accept Cookies")',
        'button:has-text("I Agree")',
        '[data-testid="cookie-accept"]',
        '#cookie-accept',
        '.cookie-accept',
        'button[class*="accept"]',
        'a[href*="cookie"]'
      ];

      for (const selector of cookieSelectors) {
        try {
          const element = await this.page.locator(selector).first();
          if (await element.isVisible({ timeout: 2000 })) {
            await element.click();
            console.log(`✅ Cookies accepted with selector: ${selector}`);
            await this.page.waitForTimeout(500); // Wait for cookie banner to disappear
            return;
          }
        } catch {
          // Continue to next selector
        }
      }

      console.log('ℹ️ No cookie banner found or already accepted');
    } catch (error) {
      console.log('ℹ️ Cookie acceptance failed, continuing test:', error.message);
    }
  }

  /**
   * Setup test environment - maximize window and accept cookies
   */
  async setupTestEnvironment(): Promise<void> {
    await this.maximizeWindow();
    await this.acceptCookies();
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(timeout: number = 10000): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
    await this.page.waitForLoadState('load', { timeout });
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 5000 });
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  /**
   * Click on an element
   */
  async clickElement(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { timeout: 5000 });
    await this.page.click(selector);
  }

  /**
   * Get text content of an element
   */
  async getElementText(selector: string): Promise<string> {
    await this.page.waitForSelector(selector, { timeout: 5000 });
    return await this.page.textContent(selector) || '';
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if current URL contains expected string
   */
  async isUrlContains(expectedUrl: string): Promise<boolean> {
    const currentUrl = this.page.url();
    return currentUrl.includes(expectedUrl);
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}