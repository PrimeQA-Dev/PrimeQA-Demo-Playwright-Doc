import {SauceDemoPage} from '../pageobjects/sauceDemoPage';
import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import { pageFixture } from "../../HooksHelper/pageFixture";
import { getTestDataValue } from '../../utils/testDataReader';
import { storeStepWithScreenshot } from "../../utils/csvHelper";


setDefaultTimeout(100*1000*2);
let sauceDemoPage = new SauceDemoPage();


Given('user open the source demo url', async function () {
  await sauceDemoPage.gotoSouceDemoUrl(pageFixture);  
});

When('user tap on login button', async function () {
  await sauceDemoPage.tapLoginButton();  
  await storeStepWithScreenshot("login screen", "tap login button", "login screen should open properly");

});

When('user login with the {string} and {string} for souce demo', async function (username, password) {
  const userName = await getTestDataValue(username)
  const psw = await getTestDataValue(password)
  await sauceDemoPage.loginAsRegisteredCustomer(userName, psw);
  await storeStepWithScreenshot("login page", "enter email and password", "Email and Password Entered Successfully");
});

Then('user tap on {string} side menu bar', async function (option) {
  await sauceDemoPage.tapOptionInSideBar(option);
  await storeStepWithScreenshot(`Main Page`, `tap on ${option}`, `able to tap on ${option}`);
  
});

Then('user is on {string} page', async function (screen) {
  await sauceDemoPage.verifyCurrentScreen(screen);
  await storeStepWithScreenshot(`${screen} page`, `user is on ${screen}`, `user should be on ${screen}`);
  
});


Then('user tap on first product on home page', async function () {
  await sauceDemoPage.tapOnFirstProduct();
  await storeStepWithScreenshot(`home page`, "tap on 1st product", "1st product should be tapped");
  
});

Then('user tap add to cart', async function () {
  await sauceDemoPage.tapAddToCart();
  await storeStepWithScreenshot(`Product page`, "click on add to cart", "product added to cart");
  
});


Then('user tap on checkout', async function () {
  await sauceDemoPage.tapOnCheckout();
  await storeStepWithScreenshot(`Product page`, "click on checkout", "checkout button on top shoulb be tapped");
  
});

Then('user is on my cart page', async function () {
  await sauceDemoPage.verifyCartPage();
  await storeStepWithScreenshot(`cart page`, "On cart page", "verify my cart page");
  
});


Then('user tap on checkout button on my cart page', async function () {
  await sauceDemoPage.tapOnCheckoutButton();
  await storeStepWithScreenshot("checkout screen" , "url open", "url should open properly");
  
});

Then('user add delivery address', async function () {
  await sauceDemoPage.addDeliveryAddress();
  await storeStepWithScreenshot(`checkout page`, "add delivery address", "able to add delivery address");
  
});






