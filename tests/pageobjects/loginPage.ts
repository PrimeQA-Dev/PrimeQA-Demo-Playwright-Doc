import { expect } from '@playwright/test';
import { pageFixture } from '../../HooksHelper/pageFixture';
import { getTestDataValue } from '../../utils/testDataReader';



let TIMEOUT = 50 * 1000;
 
export class LoginPage {

  private readonly usernameForLogin = '//input[@id="username"]';
  private readonly passwordForLogin = '//input[@id="password"]';
  private readonly loginButton = '//button[@id="submit"]';
  private readonly loggedInSuccessfully = "//div[@class='post-header']//h1[text()='Logged In Successfully']";
  private readonly enrollmentDropdown = '//div[@id="enrollDropdown"]//div';

 
  async gotoUrl(pageFixture) {
    const url = await getTestDataValue("url");
    await pageFixture.page.goto(url);

  }

  async loginAsRegisteredUser(userName, psw) {
    await expect(pageFixture.page.locator(this.usernameForLogin)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.usernameForLogin).fill(userName);

    await expect(pageFixture.page.locator(this.passwordForLogin)).toBeVisible({ timeout: TIMEOUT });
    await pageFixture.page.locator(this.passwordForLogin).fill(psw);

    await pageFixture.page.locator(this.loginButton).click();
  }


  async verifySuccessfulLogin() {
    await expect(pageFixture.page.locator(this.loggedInSuccessfully)).toBeVisible({ timeout: TIMEOUT });
  }

  async tapOnMenuBar(menu) {
    const menuBar = `//nav[@class="menu"]//a[text()="${menu}"]`;
    await pageFixture.page.locator(menuBar).click();
  }

  
  async verifyCurrentPage(menu) {
    const homePage = `//div[@class="post-header"]//h1[text()='${menu}']`;
    await expect(pageFixture.page.locator(homePage)).toBeVisible({ timeout: TIMEOUT });
  }

  async tapOption(option) {
    const optionLocator = `//p//a[text()= '${option}']`;
    await pageFixture.page.locator(optionLocator).click();
  }

  async verifyScreen(screen) {
    const homePage = `//section//h2[text()='${screen}']`;
    await expect(pageFixture.page.locator(homePage)).toBeVisible({ timeout: TIMEOUT });
  }

  async tapRadioButton(button) {
    const radioButtonLocator = `//input[@value="${button}"]`;
    await pageFixture.page.locator(radioButtonLocator).click();
  }

  async tapOnEnrollmentDropdown() {
    await pageFixture.page.locator(this.enrollmentDropdown).click();
  }

  async tapOnEnrollmentCount(count) {
    const enrollmentCountLocator = `//ul[@class="dropdown-menu"]//li[@data-value="${count}"]`
    await pageFixture.page.locator(enrollmentCountLocator).click();
  }





  
}
