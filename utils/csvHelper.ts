import fs from "fs";
import path from "path";
import screenshot from "screenshot-desktop";
import { pageFixture } from "../HooksHelper/pageFixture";
import sharp from "sharp";
import { testData} from "../utils/InterTestData"


const CSV_PATH = path.join(process.cwd(), "testData/data.csv");
const SCREENSHOT_DIR = path.join(process.cwd(), "test-output/screenshots");

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

let stepCounter = 0;

// Clean old CSV rows but keep header
function resetCSV() {
  fs.writeFileSync(
    CSV_PATH,
    "Step,Description,Expected,ScreenshotID\n"
  );
  console.log("CSV reset with 4-column header only.");
}

export async function storeStepWithScreenshot(step, description, expected) {
  // First step => clear old data
  if (stepCounter === 0) {
    resetCSV();
  }
  const isHeadless = testData.getTestData("headless")

  stepCounter++;
  const screenshotId = `SC_${String(stepCounter).padStart(3, "0")}`;
  const screenshotPath = path.join(SCREENSHOT_DIR, `${screenshotId}.png`);

  if(isHeadless === "true"){
    // Take screenshot
    const ts = new Date().toLocaleString().replace(/[/,: ]/g, "-");
    const screenshot = await pageFixture.page.screenshot({
      path: screenshotPath,
      type: "png",
    });
    await sharp(screenshotPath)
      .composite([
        {
          input: Buffer.from(`
            <svg width="800" height="50">
              <text x="10" y="30" font-size="14" fill="black">${ts}</text>
            </svg>
          `),
          top: 0,
          left: 0
        }
      ])
      .toFile(screenshotPath.replace(".png", "-stamped.png"));
      // Prepare row (NO DATETIME)
    const row = `"${step}","${description}","${expected}","${screenshotId +"-stamped"}"\n`;
        // Ensure CSV exists
    if (!fs.existsSync(CSV_PATH)) {
      fs.mkdirSync(path.dirname(CSV_PATH), { recursive: true });
      fs.writeFileSync(
        CSV_PATH,
        "Step,Description,Expected,ScreenshotID\n"
      );
    }

    // Append new row
    fs.appendFileSync(CSV_PATH, row);
    }
    else{
      // / Take screenshot
      try {
        const imgBuffer = await screenshot({ format: "png" });
        fs.writeFileSync(screenshotPath, imgBuffer);
        console.log(`[Desktop Screenshot] Saved: ${screenshotPath}`);
      } catch (err) {
        console.error("Screenshot failed:", err);
      }
      const row = `"${step}","${description}","${expected}","${screenshotId}"\n`;
      // Ensure CSV exists
      if (!fs.existsSync(CSV_PATH)) {
        fs.mkdirSync(path.dirname(CSV_PATH), { recursive: true });
        fs.writeFileSync(
          CSV_PATH,
          "Step,Description,Expected,ScreenshotID\n"
        );
      }

      // Append new row
      fs.appendFileSync(CSV_PATH, row);
    }

  console.log(`STEP STORED: ${step} | ${screenshotId}`);
}
