import { Page, Locator } from '@playwright/test';

export class FormControlsPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Enter your name');
    this.emailInput = page.getByPlaceholder('Enter your email');
  }

  async open(): Promise<void> {
    await this.page.goto('https://www.playwrightautomation.com/practice.html#section-text-inputs');
  }

  async enterName(name:string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async enterYourEmail(email:string): Promise<void> {
    await this.emailInput.fill(email);
  }
}
