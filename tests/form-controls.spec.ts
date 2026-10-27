
import { test, expect } from '@playwright/test';
import formData from '../testData/form-control.json';
import { FormControlsPage } from '../pages/FormControlsPage';


test('FORM-001: Name and email field accepts valid data', async ({ page }) => {
  const form = new FormControlsPage(page);

  await form.open();
  await page.screenshot({
    path: 'screenshots/step-1-form-opened.png',
  });

  await form.enterName(formData.validName.name);

  await expect(form.nameInput)
    .toHaveValue(formData.validName.expectedName);

  await page.screenshot({
    path: 'screenshots/step-2-name-entered.png',
    });

  await form.enterYourEmail(formData.validEmail.email);

   await expect(form.emailInput)
    .toHaveValue(formData.validEmail.expectedEmail);

   await page.screenshot({
    path: 'screenshots/step-3-email-entered.png',
  }); 

});

