import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Page elements selectors
  private readonly companyMenu = 'a.nav-link.dropdown-toggle:has-text("Company")';
  private readonly careersOption = 'a.dropdown-sub:has-text("Careers")';
  private readonly insiderLogo = '.navbar-brand img';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to home page with setup
   */
  async navigateToHomePage(): Promise<void> {
    await this.navigateTo('https://useinsider.com/');
    await this.setupTestEnvironment();
  }

  /**
   * Check if Insider home page is loaded
   */
  async isHomePageLoaded(): Promise<boolean> {
    try {
      await this.waitForPageLoad();
      // Check for main heading or logo
      const hasLogo = await this.isElementVisible('.navbar-brand img');
      const hasMainHeading = await this.page.locator('h1').filter({ hasText: 'AI-native' }).isVisible();
      return hasLogo || hasMainHeading;
    } catch {
      return false;
    }
  }

  /**
   * Find and click Company menu, then Careers option
   */
  async clickCareersOption(): Promise<void> {
    // Look for Company menu item in navigation
    const companyMenuItems = await this.page.locator('a').filter({ hasText: 'Company' });
    await companyMenuItems.first().waitFor({ timeout: 5000 });
    await companyMenuItems.first().click();

    // Wait a moment for dropdown to appear
    await this.page.waitForTimeout(500);

    // Wait for dropdown and click Careers
    await this.clickElement(this.careersOption);
  }
}