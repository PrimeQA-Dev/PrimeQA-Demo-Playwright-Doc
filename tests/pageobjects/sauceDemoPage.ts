import { expect } from '@playwright/test';
import { pageFixture } from '../../HooksHelper/pageFixture';
import { getTestDataValue } from '../../utils/testDataReader';



let TIMEOUT = 50 * 1000;
 
export class SauceDemoPage {

  private readonly loginBtn = '//div[@class="container upper"]//a[@id="customer_login_link"]';
  private readonly usernameForLogin = '//input[@id="customer_email"]';
  private readonly passwordForLogin = '//input[@id="customer_password"]';
  private readonly signInButton = '//form[@id="customer_login"]//input[@type="submit"]';
  private readonly product = '//a[@id="product-1"]';
  private readonly checkout = '//div[@id="minicart"]//a[@class="checkout"]';
  private readonly myCartPage = '//section[@id="cart"]';
  private readonly checkoutButton = '//input[@name="checkout"]';
  private readonly address = '//input[@id="shipping-address1"]';
  private readonly frist_address = '(//ul[@id="shipping-address1-options"]//li)[1]';
  private readonly addToCart = '//input[@value="Add to Cart"]';


  async gotoSouceDemoUrl(pageFixture) {
    const url = await getTestDataValue("url1");
    await pageFixture.page.goto(url);
  }


  async loginAsRegisteredCustomer(userName, psw) {
    await expect(pageFixture.page.locator(this.usernameForLogin)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.usernameForLogin).fill(userName);

    await expect(pageFixture.page.locator(this.passwordForLogin)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.passwordForLogin).fill(psw);

    await pageFixture.page.locator(this.signInButton).click();
  }

  async tapLoginButton(){
    await expect(pageFixture.page.locator(this.loginBtn)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.loginBtn).click();
  }

  async tapOptionInSideBar(option){
    const sideBarHome = `//div[@id="sidebar"]//li//a[text()="${option}"]`;
    await expect(pageFixture.page.locator(sideBarHome)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(sideBarHome).click();
  }

  async verifyCurrentScreen(screen){
    const currentScreen = `//div[@id="main"]//h1[text()="${screen}"]`;
    await expect(pageFixture.page.locator(currentScreen)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(currentScreen).click();
  }


  async tapOnFirstProduct(){
    await expect(pageFixture.page.locator(this.product)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.product).click();
  }


  async tapAddToCart(){
   
    await expect(pageFixture.page.locator(this.addToCart)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.addToCart).click({ timeout: TIMEOUT });
  }


  async tapOnCheckout(){
    await expect(pageFixture.page.locator(this.checkout)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.checkout).click();
  }


  async verifyCartPage(){
    await expect(pageFixture.page.locator(this.myCartPage)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.myCartPage).click();
  }

  async tapOnCheckoutButton(){
    await expect(pageFixture.page.locator(this.checkoutButton)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.checkoutButton).click();
  }

  async addDeliveryAddress(){
    await expect(pageFixture.page.locator(this.address)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.address).fill("Delhi");
    await expect(pageFixture.page.locator(this.frist_address)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.frist_address).click();
  }

  




}