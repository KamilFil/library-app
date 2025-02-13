import { test, expect } from '@playwright/test';

test('Page has a title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(
    /LibraryAPP - Aplikacja do zarządzania biblioteką/,
  );
});
test.describe.serial('Guest E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/books?page=1&size=5');
  });

  test('Guest sees all necessary components', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'List of books' }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: 'Title' }),
    ).toBeVisible();
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
    const rows = await page.locator('table tbody tr');
    await expect(rows).toHaveCount(5);
  });

  test('Guest sees 10 record on page', async ({ page }) => {
    await page.getByRole('button', { name: '10' }).click();

    const rows = await page.locator('table tbody tr');
    await expect(rows).toHaveCount(10);
  });

  test('Guest sees 25 record on page', async ({ page }) => {
    await page.getByRole('button', { name: '25' }).click();

    const rows = await page.locator('table tbody tr');
    await expect(rows).toHaveCount(25);
  });

  test('Guest can navigate pages', async ({ page }) => {
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
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('Guest try to login with wrong data', async ({ page }) => {
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('asasasas@pl.pl');

    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('asasasas');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('User not found')).toBeVisible();
  });

  test('Guest have already account', async ({ page }) => {
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('button', { name: 'Create an account' }).click();
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('Guest try to register with no data', async ({ page }) => {
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('button', { name: 'Create an account' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
    await expect(page.getByText('Lastname is required')).toBeVisible();
    await expect(page.getByText('Firstname is required')).toBeVisible();
  });

  test('Guest register successfully', async ({ page }) => {
    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('button', { name: 'Create an account' }).click();

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page
      .getByRole('textbox', { name: 'Email' })
      .fill(`guest@example.com`);

    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('user12');

    await page.getByRole('textbox', { name: 'Lastname' }).click();
    await page.getByRole('textbox', { name: 'Lastname' }).fill('user12');

    await page.getByRole('textbox', { name: 'Firstname' }).click();
    await page.getByRole('textbox', { name: 'Firstname' }).fill('user12');

    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page.getByText('Konto zostało utworzone!')).toBeVisible();
  });

  test('Guest deletion', async ({ request }) => {
    const getGuestResponse = await request.get(
      `http://localhost:3307/users?email=guest@example.com`,
    );
    const guests = await getGuestResponse.json();

    if (guests.length > 0) {
      const guestId = guests[0].id;
      const deleteResponse = await request.delete(
        `http://localhost:3307/users/${guestId}`,
      );
      await expect(deleteResponse.status()).toBe(200);
    }
  });

  test('Delete all logs expect id:1', async ({ request }) => {
    const getAllLogsResponse = await request.get('http://localhost:3307/logs');
    const allLogs = await getAllLogsResponse.json();

    const logsToDelete = allLogs.filter((log) => log.id !== '1');

    for (const log of logsToDelete) {
      const deleteResponse = await request.delete(
        `http://localhost:3307/logs/${log.id}`,
      );
      await expect(deleteResponse.status()).toBe(200);
    }

    const getRemainingRentalsResponse = await request.get(
      'http://localhost:3307/logs',
    );
    const remainingRentals = await getRemainingRentalsResponse.json();
    await expect(remainingRentals.length).toBe(1);
    await expect(remainingRentals[0].id).toBe('1');
  });
});
