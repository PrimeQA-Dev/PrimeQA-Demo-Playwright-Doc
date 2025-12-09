import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { docManager } from "../utils/utils";
import { pythonCreateReport } from "../utils/pyHelper";
import { testData} from "../utils/InterTestData"

import path from "path";
import fs from "fs";


let browser: Browser;
let context: BrowserContext;

BeforeAll(async () => {
  const foldersToClean = ["./test-results/screenshots", "./traces"];
  for (const folder of foldersToClean) {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true, force: true });
    }
    fs.mkdirSync(folder, { recursive: true });
  }

  try {
    console.log("Launching browser before tests...");
    const isHeadless = process.env.HEADLESS === "true";
    browser = await chromium.launch({ headless: isHeadless });
    testData.setTestData("headless", isHeadless)
    
  } catch (error) {
    console.error("Error during BeforeAll hook:", error);
    throw error; 
  }
});


Before(async () => {
  try {
    console.log("Setting up browser context before each test...");
    context = await browser.newContext();
    const page = await context.newPage();

    // Assign the new page to pageFixture
    pageFixture.page = page;
  } catch (error) {
    console.error("Error during Before hook:", error);
    throw error; // Stop tests if browser setup fails
  }

  // Start tracing
  await context.tracing.start({ screenshots: true, snapshots: true });

});

After(async function ({ pickle, result }) {
  try {
    const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

    // Take and attach screenshot on failure
    if (result?.status === Status.FAILED) {
      const screenshotPath = path.join("./test-results/screenshots", `${scenarioName}.png`);
     
      // Take screenshot
      const screenshot = await pageFixture.page.screenshot({
        path: screenshotPath,
        type: "png",
      });
      this.attach(screenshot, "image/png");
    }

    // Stop and save trace file
    await context.tracing.stop({
      path: `traces/${scenarioName}.zip`,
    });
    await new Promise(r => setTimeout(r, 1000));

    await pageFixture.page.close();
    await context.close();
  } catch (error) {
    console.error("Error during After hook:", error);
    throw error; 
  }
});

AfterAll(async () => {
  try {
    pythonCreateReport();
    console.log("Closing browser after tests...");
    await browser.close();
  } catch (error) {
    console.error("Error during AfterAll hook:", error);
  }
});
