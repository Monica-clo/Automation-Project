export class LoginElements {
    loginButton = "//a[contains(text(), 'Signup / Login')]";
    emailInput = "//input[@data-qa='login-email']";
    passwordInput = "//input[@data-qa='login-password']";
    submitLoginButton = "//button[@data-qa='login-button']";
    errorMessage = "//p[normalize-space()='Your email or password is incorrect!']";
    Products ="//a[@href='/products']";
    productListing ="//h2[normalize-space()='All Products']";
    searchproduct = "//input[@id='search_product']";
    addToCart = "//body/section/div[@class='container']/div[@class='row']/div[@class='col-sm-9 padding-right']/div[@class='features_items']/div[1]/div[1]/div[1]/div[1]";
    Viewproduct ="(//a[contains(text(),'View Product')])[2]";
    tshirtaddtocart ="//button[normalize-space()='Add to cart']";
    continueshopping ="//button[normalize-space()='Continue Shopping']";
    home ="//a[normalize-space()='Home']";
    homeListing ="(//div[@class='carousel-inner'])[1]";
    women ="//a[normalize-space()='Women']";
    dress ="//div[@id='Women']//a[contains(text(),'Dress')]";
    dress1 = "(//a[contains(text(),'View Product')])[3]";
    dressaddtocart = "//button[normalize-space()='Add to cart']";
    contactus ="//a[normalize-space()='Contact us']";
    reviewname = "//input[@placeholder='Name']";
    reviewemail = "//input[@placeholder='Email']";
    reviewsubject = "//input[@placeholder='Subject']";
    reviewmessage ="//textarea[@id='message']";
    adddoc ="//input[@name='upload_file']";
    submitreview ="//input[@name='submit']"
}
