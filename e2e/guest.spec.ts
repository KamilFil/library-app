import { test, expect } from '@playwright/test';

test('Page has a title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(
    /LibraryAPP - Aplikacja do zarządzania biblioteką/,
  );
});

test('Guest sees all necessary components', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await expect(
    page.getByRole('heading', { name: 'List of books' }),
  ).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Author' }),
  ).toBeVisible();
  await expect(
    page.getByRole('columnheader', { name: 'Quantity' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  await expect(page.getByText('LibraryApp')).toBeVisible();
});

test('Guest sees 5 record on page', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  const rows = await page.locator('table tbody tr');
  await expect(rows).toHaveCount(5);
});

test('Guest sees 10 record on page', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await page.getByRole('button', { name: '10' }).click();

  const rows = await page.locator('table tbody tr');
  await expect(rows).toHaveCount(10);
});

test('Guest sees 25 record on page', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await page.getByRole('button', { name: '25' }).click();

  const rows = await page.locator('table tbody tr');
  await expect(rows).toHaveCount(25);
});

test('Guest can navigate pages', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await page.getByRole('button', { name: '10' }).click();

  await expect(
    page.getByRole('button', { name: 'Previous Page' }),
  ).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Next Page' })).toBeVisible();

  await page.getByRole('button', { name: 'Next Page' }).click();

  await expect(
    page.getByRole('button', { name: 'Previous Page' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next Page' })).toBeVisible();

  await page.getByRole('button', { name: 'Next Page' }).click();

  await expect(
    page.getByRole('button', { name: 'Previous Page' }),
  ).toBeVisible();
  await expect(
    page.getByRole('button', { name: 'Next Page' }),
  ).not.toBeVisible();

  await page.getByRole('button', { name: 'Previous Page' }).click();

  await expect(
    page.getByRole('button', { name: 'Previous Page' }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Next Page' })).toBeVisible();
});

test('Guest try to login with no data', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('button', { name: 'Logowanie' }).click();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
});

test('Guest try to login with wrong data', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('asasasas');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('asasasas');
  await page.getByRole('button', { name: 'Logowanie' }).click();
  await expect(page.getByText('User not found')).toBeVisible();
});

test('Guest have already account', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Utwórz konto' }).click();
  await page.getByRole('button', { name: 'Mam już konto' }).click();

  await expect(page.getByRole('button', { name: 'Logowanie' })).toBeVisible();
});

test('Guest try to register with no data', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Utwórz konto' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('button', { name: 'Rejestracja' }).click();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
  await expect(page.getByText('Lastname is required')).toBeVisible();
  await expect(page.getByText('Firstname is required')).toBeVisible();
});

test('Guest register successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/books?page=1&size=5');

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.getByRole('button', { name: 'Utwórz konto' }).click();

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('user@example.com');

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('user12');

  await page.getByRole('textbox', { name: 'Lastname' }).click();
  await page.getByRole('textbox', { name: 'Lastname' }).fill('user12');

  await page.getByRole('textbox', { name: 'Firstname' }).click();
  await page.getByRole('textbox', { name: 'Firstname' }).fill('super12');

  await page.getByRole('button', { name: 'Rejestracja' }).click();

  await expect(page.getByText('Konto zostało utworzone!')).toBeVisible();
});
