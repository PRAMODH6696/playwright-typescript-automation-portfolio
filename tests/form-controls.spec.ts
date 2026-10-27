
import { test, expect } from '@playwright/test';
import formData from '../testData/form-control.json';
import { FormControlsPage } from '../pages/FormControlsPage';


test('FORM-001: Name and email field accepts valid data', async ({ page }) => {
  const form = new FormControlsPage(page);
 // Step 1: Open the form
  await form.open();
 // Step 2: Enter data
  await form.enterName(formData.validName.name);
// Step 3: Verify the entered data
  await expect(form.nameInput)
    .toHaveValue(formData.validName.expectedName);
// Step 4: Take a screenshot after entering the name
  await page.screenshot({
    path: 'screenshots/step-2-name-entered.png',
    });
// Step 4: Enter email and verify
  await form.enterYourEmail(formData.validEmail.email);
  await expect(form.emailInput)
    .toHaveValue(formData.validEmail.expectedEmail);

// Step 5: Enter address and verify
  await form.enterAddress(formData.validAddress.address);
  await expect(form.addressInput)
    .toHaveValue(formData.validAddress.expectedAddress);  

});

test('FORM-002: Verify form reset functionality', async ({ page }) => {
  const form1 = new FormControlsPage(page);

  // Step 1: Open the form
  await form1.open();

  // Step 2: Enter data
 await form1.enterName(formData.validName.name);
 await form1.enterYourEmail(formData.validEmail.email);
 await form1.enterAddress(formData.validAddress.address);

  // Step 3: Click Reset
  await form1.resetForm();

  // Step 4: Verify fields are cleared
  await expect(form1.nameInput).toHaveValue('');
  await expect(form1.emailInput).toHaveValue('');
  await expect(form1.addressInput).toHaveValue('');
});

test('FORM-003: Verify radio button selection', async ({ page }) => {
  const form = new FormControlsPage(page);

  // Step 1: Open the form
  await form.open();

  // Step 2: Select the Male radio button
  await form.maleRadio.check();

  // Step 3: Verify Male is selected
  await expect(form.maleRadio).toBeChecked();

  // Step 4: Verify Female and Non-binary / Prefer not to say are not selected
  await expect(form.femaleRadio).not.toBeChecked();
  await expect(form.binaryRadio).not.toBeChecked();
});

// FORM-004: Verify radio selection changes
test('FORM-004: Verify radio selection changes', async ({ page }) => {
  const form = new FormControlsPage(page);

  await form.open();

  // Select Male
  await form.maleRadio.check();
  await expect(form.maleRadio).toBeChecked();

  // Switch to Female
  await form.femaleRadio.check();

  // Verify the new selection
  await expect(form.femaleRadio).toBeChecked();
  await expect(form.maleRadio).not.toBeChecked();
});