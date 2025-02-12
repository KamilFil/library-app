import { test, expect } from '@playwright/test';

test.describe.serial('Admin E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:3000/books?page=1&size=5`);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page
      .getByRole('textbox', { name: 'Email' })
      .fill('admin.e2e@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('admin12');
    await page.getByRole('button', { name: 'Login' }).click();
  });

  test('Check if logged admin data is valid', async ({ page }) => {
    await expect(page.getByText('Zalogowano pomyślnie!')).toBeVisible();
    await expect(page.getByText('admin.e2e@example.com')).toBeVisible();
    await expect(page.getByText('Role: admin')).toBeVisible();
  });

  test('Check is book edition working', async ({ page }) => {
    await page
      .getByRole('row', { name: 'Book 1 Author 1' })
      .getByRole('button')
      .nth(1)
      .click();
    await page.getByPlaceholder('Quantity').click();
    await page.getByPlaceholder('Quantity').fill('2');
    await page.getByRole('textbox', { name: 'Description' }).click();
    await page
      .getByRole('textbox', { name: 'Description' })
      .fill('Lorem ipsum dolor sit amet');
    await page.getByRole('textbox', { name: 'Author' }).click();
    await page.getByRole('textbox', { name: 'Author' }).fill('Author 1!');
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('Book 1!');
    await page.getByPlaceholder('Year').click();
    await page.getByPlaceholder('Year').fill('2002');
    await page.getByRole('button', { name: 'Update book' }).click();
    await expect(page.getByRole('cell', { name: 'Book 1!' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Author 1!' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '2' }).first()).toBeVisible();
    await expect(page.getByText('Zaktualizowano książkę!')).toBeVisible();
  });

  test('Check add book working', async ({ page }) => {
    await page.getByRole('button', { name: 'Add book' }).click();
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('Test');
    await page.getByRole('textbox', { name: 'Author' }).click();
    await page.getByRole('textbox', { name: 'Author' }).fill('Test');
    await page.getByRole('textbox', { name: 'Description' }).click();
    await page
      .getByRole('textbox', { name: 'Description' })
      .fill('Test Description');
    await page.getByPlaceholder('Year').click();
    await page.getByPlaceholder('Year').fill('1998');
    await page.getByPlaceholder('Quantity').click();
    await page.getByPlaceholder('Quantity').fill('12');
    await page.getByRole('button', { name: 'Add book' }).click();
    await expect(page.getByText('Dodano książkę!')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next Page' })).toBeVisible();
    await page.getByRole('button', { name: 'Next Page' }).click();
    await page.getByRole('button', { name: 'Next Page' }).click();
    await page.getByRole('button', { name: 'Next Page' }).click();
    await page.getByRole('button', { name: 'Next Page' }).click();
    await page.getByRole('button', { name: 'Next Page' }).click();
    await expect(
      page.getByRole('cell', { name: 'Test' }).first(),
    ).toBeVisible();
    await page.getByRole('cell', { name: 'Test' }).nth(1).click();
    await expect(page.getByRole('cell', { name: 'Test' }).nth(1)).toBeVisible();
  });

  test('Check returned book user for admin', async ({ page }) => {
    await page.goto('http://localhost:3000/books?page=1&size=5');
    await page.getByRole('button', { name: 'Rentals' }).click();
    await page.getByRole('button', { name: 'Return' }).click();
    await expect(page.getByText('Are you sure you want to')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
    await page.getByRole('button', { name: 'Rentals' }).click();
    await expect(page.getByRole('cell', { name: 'Book 2' })).toBeVisible();
    await page.getByRole('cell').filter({ hasText: /^$/ }).nth(1).click();
  });

  test('Check rented book for admin', async ({ page }) => {
    await page
      .getByRole('row', { name: 'Book 3 Author 3' })
      .getByRole('button')
      .first()
      .click();
    await page.getByRole('button', { name: 'Rent a book' }).click();
    await page.getByRole('button', { name: 'OK' }).click();
    await expect(page.getByText('Zaktualizowano książkę!')).toBeVisible();
  });

  test('Set book data to previous state', async ({ request }) => {
    const response = await request.patch('http://localhost:3307/books/1', {
      data: {
        description: 'Lorem ipsum',
        author: 'Author 1',
        title: 'Book 1',
        year: 2001,
      },
    });
    await expect(response.status()).toBe(200);
    const updatedBook = await response.json();
    await expect(updatedBook.quantity).toBe(2);
  });

  test('Removed new book', async ({ request }) => {
    const getGuestResponse = await request.get(
      `http://localhost:3307/books?title=Test`,
    );
    const books = await getGuestResponse.json();

    if (books.length > 0) {
      const bookId = books[0].id;
      const deleteResponse = await request.delete(
        `http://localhost:3307/books/${bookId}`,
      );
      await expect(deleteResponse.status()).toBe(200);
    }
  });

  test('Set rentals data to previous state', async ({ request }) => {
    const response = await request.patch('http://localhost:3307/rentals/2', {
      data: {
        returnedAt: null,
      },
    });
    await expect(response.status()).toBe(200);
    const updatedRentals = await response.json();
    await expect(updatedRentals.returnedAt).toBeNull();

    const responseBook = await request.patch('http://localhost:3307/books/2', {
      data: {
        quantity: 1,
      },
    });
    const updatedBook = await responseBook.json();
    await expect(updatedBook.quantity).toBe(1);
  });

  test('Set rental data to previous state after book rental for admin', async ({
    request,
  }) => {
    const response = await request.get(
      `http://localhost:3307/rentals?bookId=3`,
    );
    await expect(response.status()).toBe(200);
    const rentals = await response.json();
    const deleteRentalId = rentals[0].id;
    const deletedRentals = await request.delete(
      `http://localhost:3307/rentals/${deleteRentalId}`,
    );
    await expect(deletedRentals.status()).toBe(200);

    const resposneBook = await request.patch('http://localhost:3307/books/3', {
      data: {
        quantity: 2,
      },
    });
    await expect(resposneBook.status()).toBe(200);
    const updatedBook = await resposneBook.json();
    await expect(updatedBook.quantity).toBe(2);
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
