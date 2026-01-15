import { test, expect } from '@playwright/test';

test('home page shows primary actions', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /migration-friendly/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create Project' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'View Guide' })).toBeVisible();
});

test('home page shows readiness checklist', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'What is ready?' })).toBeVisible();
  await expect(page.getByText('FSD-lite folder structure')).toBeVisible();
  await expect(page.getByText('React Query + Axios baseline')).toBeVisible();
});
