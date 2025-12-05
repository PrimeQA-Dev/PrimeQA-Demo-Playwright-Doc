import { expect } from '@playwright/test';
import { pageFixture } from '../../HooksHelper/pageFixture';
import { getTestDataValue } from '../../utils/testDataReader';



let TIMEOUT = 50 * 1000;
 
export class LoginPage {

  private readonly usernameForLogin = '//input[@id="username"]';
  private readonly passwordForLogin = '//input[@id="password"]';
  private readonly loginButton = '//button[@id="submit"]';
  private readonly loggedInSuccessfully = "//div[@class='post-header']//h1[text()='Logged In Successfully']";
  
 
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





  
}
