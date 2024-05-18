const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the desired URL
  await page.goto('https://example.com');

  // Use evaluate to run JavaScript in the context of the page
  await page.evaluate(() => {
    // Create a new paragraph element
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'This is a new paragraph created with Puppeteer.';

    // Append the new paragraph to the body
    document.body.appendChild(newParagraph);
  });

  // Optionally take a screenshot to verify the result
  await page.screenshot({ path: 'example.png' });

  // Close the browser
  await browser.close();
})();
