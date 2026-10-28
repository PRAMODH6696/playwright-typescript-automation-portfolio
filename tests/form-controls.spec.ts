
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


test('FORM-005: Individual checkboxes can be selected', async ({ page }) => {
  const form5 = new FormControlsPage(page);
  await form5.open();

  const days: string[] = ['Sunday', 'Monday', 'Tuesday'];

  for (const day of days) {
    const checkbox = form5.getDayCheckbox(day);

    // Verify checkbox is visible and enabled
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeEnabled();

    // Select checkbox
    await form5.selectDay(day);

    // Verify checkbox is selected
    await expect(checkbox).toBeChecked();
  }
});

test('FORM-006: Verify Select All selects every day', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();
  await form.selectAllDays();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  for (const day of days) {
    await expect(
      page.getByRole('checkbox', { name: day, exact: true })
    ).toBeChecked();
  }
});

test('FORM-007: Multi-select accepts multiple values', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();

  const brands = form.clothingBrands;

  await expect(brands).toBeVisible();
  await expect(brands).toHaveAttribute('multiple', '');

  // Select by actual option values, not duplicate labels.
  const options = await brands.locator('option').evaluateAll((elements) =>
    elements.map((element) => ({
      label: (element as HTMLOptionElement).label,
      value: (element as HTMLOptionElement).value,
    }))
  );

  const puma = options.find((option) => option.label === 'Puma');
  const zara = options.find((option) => option.label === 'Zara');

  expect(puma).toBeDefined();
  expect(zara).toBeDefined();

  if (!puma || !zara) {
    throw new Error('Expected Puma and Zara options were not found');
  }

  await brands.selectOption([puma.value, zara.value]);

  await expect(brands).toHaveValues([puma.value, zara.value]);
});

test('FORM-008: Toggle switches change state', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();

  const toggles = [
    form.notificationsToggle,
    form.emailAlertsToggle,
    form.autoSaveToggle,
  ];

  for (const toggle of toggles) {
    await expect(toggle).toBeVisible();

    const wasChecked = await toggle.isChecked();

    await toggle.setChecked(!wasChecked);

    await expect(toggle).toBeChecked({ checked: !wasChecked });
  }
});

test('FORM-009: Tooltip appears on hover', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();

  await form.deliveryEstimateButton.hover();

  const tooltip = page.getByText(
    'Standard delivery takes 3–5 working days.',
    { exact: true }
  );

  await expect(tooltip).toBeVisible();
});

test('FORM-010: Tooltip appears on keyboard focus', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();

  await form.deliveryEstimateButton.focus();

  await expect(form.deliveryEstimateButton).toBeFocused();

  const tooltip = page.getByText(
    'Standard delivery takes 3–5 working days.',
    { exact: true }
  );

  await expect(tooltip).toBeVisible();
});

test('FORM-011: Hide Element hides the target', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();

  await expect(form.targetField).toBeVisible();

  await form.hideElementButton.click();

  await expect(form.targetField).toBeHidden();
});

test('FORM-012: Show Element restores the target', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();

  // Establish the hidden starting state.
  await form.hideElementButton.click();
  await expect(form.targetField).toBeHidden();

  await form.showElementButton.click();

  await expect(form.targetField).toBeVisible();
});

test('FORM-013: Hidden controls become available when toggled', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();

  // Reveal Input Box 2
  await expect(form.toggleInputBox2Button).toBeVisible();
  await form.toggleInputBox2Button.click();

  await expect(form.inputBox2).toBeVisible();
  await expect(form.inputBox2).toBeEnabled();

  // Reveal Checkbox 2
  await expect(form.toggleCheckbox2Button).toBeVisible();
  await form.toggleCheckbox2Button.click();

  await expect(form.checkbox2).toBeVisible();
  await expect(form.checkbox2).toBeEnabled();

  await form.checkbox2.check();
  await expect(form.checkbox2).toBeChecked();
});

test('FORM-014: AJAX content appears after loading', async ({ page }) => {
  const form = new FormControlsPage(page);
  await form.open();
  await form.loadAjaxButton.click();

  const loadedContent = page.getByText(
    'AJAX content loaded',
    { exact: true }
  );

  await expect(loadedContent).toBeVisible();
});