import { expect, test } from '@playwright/test';

test('should immediately show todo', async ({ page }) => {
  await page.goto('/');

  const unorderedList = page.getByTestId('main:todo-list');

  await expect(unorderedList).toBeInViewport();
});
