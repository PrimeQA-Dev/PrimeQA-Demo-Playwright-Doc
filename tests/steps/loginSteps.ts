import {LoginPage} from '../pageobjects/loginPage';
import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import { pageFixture } from "../../HooksHelper/pageFixture";
import { getTestDataValue } from '../../utils/testDataReader';
// import { docCreate,docManager } from '../../utils/';
// import { pythonStoreStep, pythonCreateReport } from "../../utils/docTest";
import { storeStepWithScreenshot } from "../../utils/read";




setDefaultTimeout(100*1000*2);
let loginPage = new LoginPage();

Given('user open the system url', async function () {
  await loginPage.gotoUrl(pageFixture);  
});

When('user login with {string} and {string}', async function (username, password) {
  const userName = await getTestDataValue(username)
  const psw = await getTestDataValue(password)
  await loginPage.loginAsRegisteredUser(userName, psw);
  storeStepWithScreenshot("Open Site", "url open", "url should open properly");
  
});

Then('user should be logged in successfully', async function () {
  await loginPage.verifySuccessfulLogin();
  await storeStepWithScreenshot("Site", "Load homepage", "Homepage should load");
});


Then('user tap on {string} menu bar', async function (menu) {
  await loginPage.tapOnMenuBar(menu);
  await storeStepWithScreenshot("Menu Bar", `Tap on ${menu} menu`, `${menu} menu should open properly`);
});


Then('user should be navigated to {string} page', async function (menu) {
  if(menu.toLowerCase()=='home'){
    menu = 'Hello';
  }
  await loginPage.verifyCurrentPage(menu);  
  await storeStepWithScreenshot("Home Page", `Verify ${menu} page`, `${menu} page should be displayed properly`);
  
});







