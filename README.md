import { Page } from 'playwright';
import { LoginElements } from './LoginElements';
import { LoginData } from './LoginData';

export class LoginPage {
    elements: LoginElements;

    constructor(private page: Page) {
        this.elements = new LoginElements();
    }

    async navigateToLoginPage() {
        await this.page.goto(LoginData.logininlink);
        await this.page.click(this.elements.loginButton);
    }

    async login(email: string, password: string) {
        await this.page.fill(this.elements.emailInput, email);
        await this.page.fill(this.elements.passwordInput, password);
        await this.page.click(this.elements.submitLoginButton);
        
    }

    async getErrorMessage() {
        return await this.page.textContent(this.elements.errorMessage);
    }
    async goToProducts() {
        await this.page.click(this.elements.Products);
        await this.page.waitForSelector(this.elements.productListing); 
    }

    async searchAndAddToCart(productName: string) {
        // Search for the product
        await this.page.fill(this.elements.searchproduct, productName);
        await this.page.click(this.elements.searchproduct); 
        await this.page.waitForSelector(this.elements.searchproduct); 
        await this.page.click(this.elements.Viewproduct);
        await this.page.click(this.elements.tshirtaddtocart);
        await this.page.waitForTimeout(500);
        await this.page.click(this.elements.continueshopping);
        await this.page.click(this.elements.Products);
        
    }
    async gotoHome() {
        await this.page.click(this.elements.home);
        await this.page.waitForSelector(this.elements.homeListing);
        await this.page.click(this.elements.women);
        await this.page.click(this.elements.dress);
        await this.page.click(this.elements.dress1);
        await this.page.click(this.elements.dressaddtocart);

    }

    async goandreview(reviewname: string, reviewemail: string, reviewsubject: string, reviewmessage:string , adddoc:string, submitreview:string){
        await this.page.click(this.elements.contactus);
        await this.page.fill(this.elements.reviewname,"MonicaN");
        await this.page.fill(this.elements.reviewemail,"mmoni1141@gmail.com");
        await this.page.fill(this.elements.reviewsubject,"Review update");
        await this.page.fill(this.elements.reviewmessage,"web application is not stable please update the version");
        const fileInputSelector = this.elements.adddoc; // Assuming this is the selector for the file input field
        await this.page.setInputFiles(fileInputSelector, adddoc); // Provide the file path from the spec file
        await this.page.click(this.elements.submitreview);

    }

}
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
