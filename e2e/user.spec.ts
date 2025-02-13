import { test, expect } from '@playwright/test';

test.describe.serial('User E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:3000/books?page=1&size=5`);

    await page.getByRole('button', { name: 'Log In' }).click();

    await page.getByRole('textbox', { name: 'Email' }).click();
    await page
      .getByRole('textbox', { name: 'Email' })
      .fill('user.e2e@example.com');

    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('user12');

    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Check if logged user data is valid', async ({ page }) => {
    await expect(page.getByText('user.e2e@example.com')).toBeVisible();
    await expect(page.getByText('Role: user')).toBeVisible();
    await expect(page.getByText('Successfully logged in!')).toBeVisible();
  });

  test('User should not be able to rent a book with quantity 0', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'All books' }).click();
    await page
      .getByRole('row', { name: 'Book 1 Author 1' })
      .getByRole('button')
      .click();
    await page.getByRole('button', { name: 'Rent a book' }).click();

    await expect(page.getByText('There is no available copy of')).toBeVisible();
    await expect(page.getByRole('button', { name: 'CLOSE' })).toBeVisible();
  });

  test('User should be able to cancel renting a book', async ({ page }) => {
    await page.getByRole('button', { name: 'All books' }).click();
    await page
      .getByRole('row', { name: 'Book 2 Author 2' })
      .getByRole('button')
      .click();
    await page.getByRole('button', { name: 'Rent a book' }).click();

    await expect(page.getByText('Are you sure you want to rent')).toBeVisible();
    await expect(page.getByRole('button', { name: 'CLOSE' })).toBeVisible();

    await page.getByRole('button', { name: 'CLOSE' }).click();
  });

  test('User should be able to rent a book', async ({ page }) => {
    await page.getByRole('button', { name: 'All books' }).click();
    await page
      .getByRole('row', { name: 'Book 3 Author 3' })
      .getByRole('button')
      .click();
    await page.getByRole('button', { name: 'Rent a book' }).click();

    await expect(page.getByText('Are you sure you want to rent')).toBeVisible();

    await page.getByRole('button', { name: 'OK' }).click();

    await expect(page.getByText('Book updated!')).toBeVisible();
  });

  test('User should not be able to delete account with rented books', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('You have to return all rented')).toBeVisible();
  });

  test('User should be able to logout', async ({ page }) => {
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByText('You have been logged out!')).toBeVisible();
  });

  test('User should be able to cancel returning a book', async ({ page }) => {
    await page.getByRole('button', { name: 'My books' }).click();
    await page.getByRole('button', { name: 'Return' }).click();
    await expect(page.getByText('Are you sure you want to')).toBeVisible();
    await page.getByRole('button', { name: 'CLOSE' }).click();
  });

  test('User should be able to return a book', async ({ page }) => {
    await page.getByRole('button', { name: 'My books' }).click();
    await page.getByRole('button', { name: 'Return' }).click();
    await expect(page.getByText('Are you sure you want to')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('Book returned!')).toBeVisible();
  });

  test('User should be able to change year and month', async ({ page }) => {
    await page.locator('#year-select').click();
    await page.getByRole('option', { name: '2024' }).click();
    await page.getByLabel('', { exact: true }).click();
    await page.getByRole('option', { name: 'May' }).click();
    await expect(page.getByRole('combobox', { name: '2024' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'May' })).toBeVisible();
  });

  test('User should be able to see stats', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'My stats' })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Rented books in selected year' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'All books returned on time:' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'All books returned after' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'All Books already rented:' }),
    ).toBeVisible();
  });

  test('User should be able to cancel deletion of if no books rented', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.getByText('Are you sure you want to')).toBeVisible();
    await page.getByRole('button', { name: 'CLOSE' }).click();
  });

  test('User should be able to delete account if no books rented', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('User has been deleted!')).toBeVisible();
  });

  test('Update users isDeleted flag on false', async ({ request }) => {
    const response = await request.patch('http://localhost:3307/users/1', {
      data: {
        isDeleted: false,
      },
    });
    await expect(response.status()).toBe(200);
    const updatedUser = await response.json();
    await expect(updatedUser.isDeleted).toBe(false);
  });

  test('Update Book 3 Author 3 quantity to 2', async ({ request }) => {
    const response = await request.patch('http://localhost:3307/books/3', {
      data: {
        quantity: 2,
      },
    });
    await expect(response.status()).toBe(200);
    const updatedBook = await response.json();
    await expect(updatedBook.quantity).toBe(2);
  });

  test('Delete all rentals expect id:1', async ({ request }) => {
    const getAllRentalsResponse = await request.get(
      'http://localhost:3307/rentals',
    );
    const allRentals = await getAllRentalsResponse.json();

    const rentalsToDelete = allRentals.filter((rental) => rental.id !== '1');

    for (const rental of rentalsToDelete) {
      const deleteResponse = await request.delete(
        `http://localhost:3307/rentals/${rental.id}`,
      );
      await expect(deleteResponse.status()).toBe(200);
    }

    const getRemainingRentalsResponse = await request.get(
      'http://localhost:3307/rentals',
    );
    const remainingRentals = await getRemainingRentalsResponse.json();
    await expect(remainingRentals.length).toBe(1);
    await expect(remainingRentals[0].id).toBe('1');
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
