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
  readonly ajaxContent: Locator;

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
  this.ajaxContent = page.locator('#ajax-content');
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

  getDayCheckbox(day: string): Locator {
    return this.page.getByRole('checkbox', {
      name: day,
      exact: true,
    });
  }

  // Reusable checkbox action
  async selectDay(day: string): Promise<void> {
    await this.getDayCheckbox(day).check();
  }

  // Click Select All
async selectAllDays(): Promise<void> {
  await this.page
    .getByRole('checkbox', { name: 'Select all days', exact: true })
    .check();

}
// FORM-007: Multi-select
get clothingBrands(): Locator {
  return this.page.getByLabel('Clothing brands');
}

// FORM-008: Toggle switches
get notificationsToggle(): Locator {
  return this.page.getByRole('checkbox', {
    name: /Enable Notifications/,
  });
}

get emailAlertsToggle(): Locator {
  return this.page.getByRole('checkbox', {
    name: /Email Alerts/,
  });
}

get autoSaveToggle(): Locator {
  return this.page.getByRole('checkbox', {
    name: /Auto Save/,
  });
}

// FORM-009 and FORM-010: Tooltip
get deliveryEstimateButton(): Locator {
  return this.page.getByRole('button', {
    name: 'Delivery estimate',
  });
}

// FORM-011 and FORM-012: Show/Hide
get hideElementButton(): Locator {
  return this.page.getByRole('button', {
    name: 'Hide Element',
    exact: true,
  });
}

get showElementButton(): Locator {
  return this.page.getByRole('button', {
    name: 'Show Element',
    exact: true,
  });
}

get targetField(): Locator {
  return this.page.getByRole('textbox', {
    name: 'I disappear when you click Hide',
  });
}

// FORM-013: Hidden controls
get toggleInputBox2Button(): Locator {
  return this.page.getByRole('button', {
    name: 'Toggle Input Box 2',
    exact: true,
  });
}

get inputBox2(): Locator {
  return this.page.getByRole('textbox', {
    name: 'Input Box 2',
    exact: true,
  });
}

get toggleCheckbox2Button(): Locator {
  return this.page.getByRole('button', {
    name: 'Toggle Checkbox 2',
    exact: true,
  });
}

get checkbox2(): Locator {
  return this.page.getByRole('checkbox', {
    name: 'Checkbox 2',
    exact: true,
  });
}

// FORM-014 and FORM-015: AJAX
get loadAjaxButton(): Locator {
  return this.page.getByRole('button', {
    name: 'Load AJAX Content',
    exact: true,
  });
}
}



