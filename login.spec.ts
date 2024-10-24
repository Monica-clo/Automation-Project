import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Ensure the path is correct
import { LoginData } from '../pages/LoginData';
test.describe('Login functionality', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    
  });
  test('Unsuccessful login with incorrect credentials', async () => {
    const { email, password } = LoginData.invalidUser; // Fetch from credentials.json
    await loginPage.login(email, password);
    
    // Get the invalid password error message
    const invalidPasswordMessage = await loginPage.getErrorMessage();
    expect(invalidPasswordMessage).toContain('Your email or password is incorrect!'); // Adjust based on your UI message
  });
  test('Login and search products', async ({ page }) => {
    const { email, password } = LoginData.validUser;
    
    // Log in
    await loginPage.login(email, password);
    await loginPage.goToProducts();
    var productName = 'T-shirt'; 
    await loginPage.searchAndAddToCart("Men Tshirt");
});
test('Login and add product to cart from home', async ({ page }) => {
  const { email, password } = LoginData.validUser;
  await loginPage.login(email, password);
  await loginPage.gotoHome();
  const cartNotification = await page.locator('Rose Pink Embroidered Maxi Dress');
});
test('Login and submit a review on the contact page', async ({ page }) => {
  const { email, password } = LoginData.validUser;
  
  // Log in with valid credentials
  await loginPage.login(email, password);
  // Navigate to the contact us page and submit the review
  const reviewDetails = {
    reviewname: "MonicaN",
    reviewemail: "mmoni1141@gmail.com",
    reviewsubject: "Review update",
    reviewmessage: "Web application is not stable, please update the version",
    adddoc: "./Document/Screenshot 2024-10-23 200143.png",
    submitreview:"./Document/Screenshot 2024-10-23 200143.png"
  };
  await loginPage.goandreview(
    reviewDetails.reviewname,
    reviewDetails.reviewemail,
    reviewDetails.reviewsubject,
    reviewDetails.reviewmessage,
    reviewDetails.adddoc,
    reviewDetails.submitreview

  );
  //await expect(page.locator('text=Your review has been submitted')).toBeVisible();

});
});