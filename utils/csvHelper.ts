import fs from "fs";
import path from "path";
import screenshot from "screenshot-desktop";

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

  stepCounter++;
  const screenshotId = `SC_${String(stepCounter).padStart(3, "0")}`;
  const screenshotPath = path.join(SCREENSHOT_DIR, `${screenshotId}.png`);

  // Take screenshot
  try {
    const imgBuffer = await screenshot({ format: "png" });
    fs.writeFileSync(screenshotPath, imgBuffer);
    console.log(`[Desktop Screenshot] Saved: ${screenshotPath}`);
  } catch (err) {
    console.error("Screenshot failed:", err);
  }

  // Prepare row (NO DATETIME)
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

  console.log(`STEP STORED: ${step} | ${screenshotId}`);
}
