import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class QAJobsPage extends BasePage {
  // Page elements selectors
  private readonly locationFilter = '.form-control';
  private readonly departmentFilter = '.form-control';
  private readonly jobsList = '.row';
  private readonly jobItem = '.col-12';
  private readonly viewRoleButton = '.btn-navy';
  private readonly jobPosition = 'p[class*="font-weight-bold"]';
  private readonly jobDepartment = 'span[class*="text-primary"]';
  private readonly jobLocation = 'span[class*="text-muted"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to filtered jobs page
   */
  async filterByLocationAndDepartment(location: string, department: string): Promise<void> {
    const url = `https://useinsider.com/careers/open-positions/?department=${department.toLowerCase().replace(' ', '')}`;
    await this.navigateTo(url);
    await this.waitForPageLoad();
  }

  /**
   * Check if jobs list is present and not empty
   */
  async isJobsListPresent(): Promise<boolean> {
    try {
      await this.waitForElement(this.jobsList, 10000);
      const jobCount = await this.page.locator(this.jobItem).count();
      return jobCount > 0;
    } catch {
      return false;
    }
  }

  /**
   * Get all job positions
   */
  async getAllJobPositions(): Promise<string[]> {
    const positions = await this.page.locator('p[class*="font-weight-bold"]').allTextContents();
    return positions.map(pos => pos.trim());
  }

  /**
   * Get all job departments
   */
  async getAllJobDepartments(): Promise<string[]> {
    const departments = await this.page.locator('span[class*="text-primary"]').allTextContents();
    return departments.map(dept => dept.trim());
  }

  /**
   * Get all job locations
   */
  async getAllJobLocations(): Promise<string[]> {
    const locations = await this.page.locator('span[class*="text-muted"]').allTextContents();
    return locations.map(loc => loc.trim());
  }

  /**
   * Check if all job positions contain "Quality Assurance"
   */
  async verifyAllPositionsContainQA(): Promise<boolean> {
    const positions = await this.getAllJobPositions();
    return positions.every(position =>
      position.toLowerCase().includes('quality assurance') ||
      position.toLowerCase().includes('qa')
    );
  }

  /**
   * Check if all job departments contain "Quality Assurance"
   */
  async verifyAllDepartmentsContainQA(): Promise<boolean> {
    const departments = await this.getAllJobDepartments();
    return departments.every(dept =>
      dept.toLowerCase().includes('quality assurance') ||
      dept.toLowerCase().includes('qa')
    );
  }

  /**
   * Check if all job locations contain "Istanbul, Turkey"
   */
  async verifyAllLocationsContainIstanbulTurkey(): Promise<boolean> {
    const locations = await this.getAllJobLocations();
    return locations.every(location =>
      location.toLowerCase().includes('istanbul') &&
      location.toLowerCase().includes('turkey')
    );
  }

  /**
   * Click the first "View Role" button
   */
  async clickFirstViewRoleButton(): Promise<void> {
    const viewRoleButtons = this.page.locator(this.viewRoleButton);
    await viewRoleButtons.first().waitFor({ timeout: 5000 });
    await viewRoleButtons.first().click();
  }

  /**
   * Check if redirected to Lever application form
   */
  async isLeverApplicationForm(): Promise<boolean> {
    await this.waitForPageLoad();
    const currentUrl = await this.getCurrentUrl();
    console.log('Current URL after clicking View Role:', currentUrl);
    return currentUrl.includes('jobs.lever.co') || currentUrl.includes('lever.co');
  }
}