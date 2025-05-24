const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate and login
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.click('#login-button')
  ]);

  // Wait for product items to load
  await page.waitForSelector('.inventory_item', { timeout: 10000 });
  const allItems = await page.$$('.inventory_item');
  const oddIndexedItems = allItems.filter((_, index) => index % 2 === 0);

  let addedCount = 0;

  async function waitForCartBadgeToUpdate(expectedCount) {
    await page.waitForFunction(
      (count) => {
        const badge = document.querySelector('.shopping_cart_badge');
        return badge && parseInt(badge.textContent, 10) === count;
      },
      expectedCount,
      { timeout: 5000 }
    );
  }

  for (const item of oddIndexedItems) {
    const button = await item.$('button.btn_inventory');
    if (button) {
      await button.waitForElementState('visible', { timeout: 5000 });
      await button.click();
      addedCount++;
      await waitForCartBadgeToUpdate(addedCount);
    }
  }

  // Scroll to top to view cart badge
  await page.locator('div.primary_header').scrollIntoViewIfNeeded();
  await page.waitForSelector('.shopping_cart_badge', { timeout: 5000 });

  const badgeText = await page.textContent('.shopping_cart_badge');
  const badgeCount = parseInt(badgeText, 10);

  console.log(`Items added: ${addedCount}`);
  console.log(`Cart badge shows: ${badgeCount}`);

  if (addedCount === badgeCount) {
    console.log('Cart count verified');
  } else {
    console.log('Mismatch in cart count');
  }

  await browser.close();
})();
