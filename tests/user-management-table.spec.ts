import { expect, Page, test } from "@playwright/test";

const getUserRows = async (page: Page) => {
  return await page.$$('[data-testid^="user-management-table-row-"]');
};

const getRowCount = async (page: Page) => {
  return await page.$$eval(
    '[data-testid^="user-management-table-row-"]',
    (rows) => rows.length
  );
};

const waitForTableToBeLoaded = async (page: Page) => {
  await page.waitForSelector('[data-testid="user-management-table"]');

  await page.waitForFunction(() => {
    const rows = document.querySelectorAll(
      '[data-testid^="user-management-table-row-"]'
    );
    return rows.length === 9;
  });

  const initialRowCount = await getRowCount(page);
  expect(initialRowCount).toBe(9);
};

test("should search particular user", async ({ page }) => {
  await page.goto("/");

  await waitForTableToBeLoaded(page);

  await page.fill('input[placeholder="Search"]', "Christy Larson");

  await page.waitForFunction(() => {
    const rows = document.querySelectorAll(
      '[data-testid^="user-management-table-row-"]'
    );
    return (
      rows.length === 1 &&
      Array.from(rows).some((row) =>
        row.textContent?.includes("Christy Larson")
      )
    );
  });

  const updatedRowCount = await getRowCount(page);
  expect(updatedRowCount).toBe(1);

  await page.fill('input[placeholder="Search"]', "");

  await page.waitForFunction(() => {
    const rows = document.querySelectorAll(
      '[data-testid^="user-management-table-row-"]'
    );
    return rows.length === 9;
  });
});

test("should select individual users", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector('[data-testid="user-management-table"]');

  await waitForTableToBeLoaded(page);

  const userRows = await getUserRows(page);

  const checkbox1 = await userRows[0].$('[data-testid="checkbox"]');
  await checkbox1?.check();

  const checkbox2 = await userRows[3].$('[data-testid="checkbox"]');
  await checkbox2?.check();

  const checkbox3 = await userRows[8].$('[data-testid="checkbox"]');
  await checkbox3?.check();

  const isSelectionTextVisible = await page.isVisible(
    'text="3 users selected"'
  );
  expect(isSelectionTextVisible).toBeTruthy();
});

test("should select all users", async ({ page }) => {
  await page.goto("/");

  await waitForTableToBeLoaded(page);

  const selectAllCheckbox = await page.$(
    '[data-testid="user-management-table-header"] [data-testid="checkbox"]'
  );
  await selectAllCheckbox?.check();

  const userRows = await page.$$('[data-testid^="user-management-table-row-"]');
  for (const row of userRows) {
    const checkbox = await row.$('[data-testid="checkbox"]');
    const isChecked = await checkbox?.isChecked();
    expect(isChecked).toBeTruthy();
  }

  expect(await page.isVisible('text="9 users selected"')).toBeTruthy();

  await selectAllCheckbox?.uncheck();

  for (const row of userRows) {
    const checkbox = await row.$('[data-testid="checkbox"]');
    const isChecked = await checkbox?.isChecked();
    expect(isChecked).toBeFalsy();
  }

  expect(await page.isVisible('text="0 users selected"')).toBeTruthy();
});

test("should sort permissions", async ({ page }) => {
  await page.goto("/");

  await page.waitForFunction(() => {
    const rows = document.querySelectorAll(
      '[data-testid^="user-management-table-row-"]'
    );
    return (
      rows.length === 9 &&
      Array.from(rows).every((row) =>
        row.textContent?.includes("Account manager")
      )
    );
  });

  await page.click('[data-testid="user-management-table-permission-sort"]');

  await page.waitForFunction(() => {
    const rows = document.querySelectorAll(
      '[data-testid^="user-management-table-row-"]'
    );
    return (
      rows.length === 9 &&
      Array.from(rows).every((row) =>
        row.textContent?.includes("External reviewer")
      )
    );
  });
});
