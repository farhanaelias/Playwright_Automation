const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('UI Automation', () => {
  test('Sign Up and Product Checkout', async ({ page }) => {
    // Step 1: Visit the Login Page
    await page.goto('https://automationexercise.com/login', { waitUntil: 'domcontentloaded' });
    console.log('Visited Login Page.');

    // Step 2: Sign-Up Process
    try {
      // Wait for the sign-up form to load
      console.log('Waiting for the sign-up form...');
      await page.waitForSelector('form[action="/signup"]', { timeout: 30000 });

      // Select Mrs. Radio Button
      console.log('Selecting "Mrs." radio button...');
      const radioButtonLabel = page.locator('label[for="id_gender2"]');
      await radioButtonLabel.waitFor({ state: 'visible' });
      await radioButtonLabel.click();
      console.log('"Mrs." option selected.');

      // Fill in the remaining fields
      console.log('Filling in form fields...');
      await page.fill('input[name="name"]', 'Farhana Elias'); // Name
      await page.fill('input[name="email"]', 'farhana.elias1234@gmail.com'); // Email
      await page.fill('input[name="password"]', 'Password123'); // Password
      await page.selectOption('select[name="days"]', '8'); // Day of Birth
      await page.selectOption('select[name="months"]', '10'); // Month of Birth
      await page.selectOption('select[name="years"]', '2000'); // Year of Birth

      // Address details
      console.log('Filling in address details...');
      await page.fill('input[name="first_name"]', 'Farhana'); // First Name
      await page.fill('input[name="last_name"]', 'Elias'); // Last Name
      await page.fill('input[name="address1"]', '123 Main Street'); // Address
      await page.selectOption('select[name="country"]', 'United States'); // Country
      await page.fill('input[name="state"]', 'California'); // State
      await page.fill('input[name="city"]', 'Los Angeles'); // City
      await page.fill('input[name="zipcode"]', '90001'); // Zip Code
      await page.fill('input[name="mobile_number"]', '01842499406'); // Mobile Number

      // Submit the form
      console.log('Clicking the sign-up button...');
      const signUpButton = page.locator('button#signup');
      await signUpButton.waitFor({ state: 'visible' });
      await signUpButton.click();
      await page.waitForLoadState('networkidle');
      console.log('Sign-Up process completed successfully.');
    } catch (error) {
      console.error('Error during Sign-Up process:', error);
      throw error;
    }

    // Step 3: Select Product Category
    try {
      console.log('Navigating to product categories...');
      await page.click('a[href="/products"]');
      await page.waitForSelector('a[href="/category/men"]', { timeout: 30000 });
      await page.click('a[href="/category/men"]');
      await page.click('a[href="/category/men/jeans"]');
      console.log('Navigated to Jeans category.');
    } catch (error) {
      console.error('Error navigating product categories:', error);
      throw error;
    }

    // Step 4: View and Update Product
    try {
      console.log('Viewing and updating product...');
      await page.waitForSelector('a.view-product', { timeout: 10000 });
      await page.click('a.view-product');
      await page.fill('input#quantity', '2');
      await page.click('button#add-to-cart');
      console.log('Product added to cart.');
    } catch (error) {
      console.error('Error viewing/updating product:', error);
      throw error;
    }

    // Step 5: Proceed to Checkout
    try {
      console.log('Proceeding to checkout...');
      await page.click('a#cart');
      await page.click('button#proceed-to-checkout');
      console.log('Proceeded to checkout.');

      console.log('Entering payment details...');
      await page.fill('input[name="name_on_card"]', 'Farhana Elias'); // Name on the Card
      await page.fill('input[name="card_number"]', '4111111111111111'); // Card Number
      await page.fill('input[name="cvc"]', '123'); // CVC Code
      await page.fill('input[name="expiry"]', '12/25'); // Expiration Date
      await page.click('button#confirm_order');
      console.log('Order placed successfully.');
    } catch (error) {
      console.error('Error during checkout:', error);
      throw error;
    }

    // Step 6: Contact Us Form Submission
    try {
      console.log('Submitting Contact Us form...');
      await page.click('a[href="/contact_us"]');
      await page.waitForSelector('form[action="/contact"]', { timeout: 10000 });

      await page.fill('input[name="name"]', 'Farhana Elias'); // Name
      await page.fill('input[name="email"]', 'farhanaelias1234@gmail.com'); // Email
      await page.fill('input[name="subject"]', 'Feedback on Service'); // Subject
      await page.fill('textarea#message', 'This is a test message.'); // Message

      // Attach a file
      const filePath = path.resolve('D:/abc.txt');
      await page.setInputFiles('input[type="file"]', filePath);
      await page.click('button#submit');
      await page.waitForSelector('.success-message', { timeout: 10000 });
      console.log('Contact Us form submitted successfully.');
    } catch (error) {
      console.error('Error during Contact Us form submission:', error);
      throw error;
    }
  });
});
