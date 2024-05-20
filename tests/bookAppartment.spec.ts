import { test, expect } from '@playwright/test';
import { MainPage } from '../page-object/mainPage';


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.booking.com/');
    await page.locator('#onetrust-accept-btn-handler').click();
});

test('book appartment', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.findAppartment('Zakopane', '21', '24', 2, 0, 1);
});