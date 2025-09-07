import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CareersPage extends BasePage {
  // Page elements selectors
  private readonly locationsBlock = '.location-item, [class*="location"]';
  private readonly teamsBlock = '.team-item, [class*="team"]';
  private readonly lifeAtInsiderBlock = '.life-at-insider, [class*="life"]';
  private readonly seeAllQAJobsButton = 'a[href*="careers/quality-assurance"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Check if Careers page is loaded with all required blocks
   */
  async isCareersPageLoaded(): Promise<boolean> {
    try {
      await this.waitForPageLoad();

      // Check if we're on the careers page by looking for key elements
      const pageTitle = await this.page.locator('h1').textContent();
      return pageTitle?.includes('disrupt') || pageTitle?.includes('Ready') || false;
    } catch {
      return false;
    }
  }

  /**
   * Check if Locations block is visible
   */
  async isLocationsBlockVisible(): Promise<boolean> {
    return await this.page.locator('text=Our Locations').isVisible();
  }

  /**
   * Check if Teams block is visible
   */
  async isTeamsBlockVisible(): Promise<boolean> {
    return await this.page.locator('text=Find your calling').isVisible();
  }

  /**
   * Check if Life at Insider block is visible
   */
  async isLifeAtInsiderBlockVisible(): Promise<boolean> {
    return await this.page.locator('text=Life at Insider').isVisible();
  }

  /**
   * Click on "See all QA jobs" button
   */
  async clickSeeAllQAJobs(): Promise<void> {
    await this.clickElement(this.seeAllQAJobsButton);
  }
}