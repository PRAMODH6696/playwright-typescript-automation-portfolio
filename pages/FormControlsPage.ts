import { Page, Locator } from '@playwright/test';

export class FormControlsPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly addressInput: Locator;
  readonly resetButton: Locator; 
  readonly maleRadio: Locator;
  readonly femaleRadio: Locator;
  readonly binaryRadio: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder('Enter your name');
    this.emailInput = page.getByPlaceholder('Enter your email');
    this.addressInput = page.locator("(//textarea[@id='address'])[1]");
    this.resetButton = page.locator("(//button[@id='btn-reset-text-inputs'])[1]");
    this.maleRadio = this.page.getByTestId('radio-male');
    this.femaleRadio = this.page.getByTestId('radio-female');
    this.binaryRadio = this.page.getByRole('radio', {
  name: 'Non-binary / Prefer not to say',
});
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

  async enterAddress(address:string): Promise<void> {  
    await this.addressInput.fill(address);
  }

  async resetForm(): Promise<void> {
    await this.resetButton.click();
  }



}