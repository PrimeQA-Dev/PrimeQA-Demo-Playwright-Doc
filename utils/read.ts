import fs from "fs";
import path from "path";
import screenshot from "screenshot-desktop";

const CSV_PATH = path.join(process.cwd(), "testData/data.csv");
const SCREENSHOT_DIR = path.join(process.cwd(), "test-output/screenshots");

// Ensure directories exist
if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

let stepCounter = 0;

export async function storeStepWithScreenshot(
  step: string,
  description: string,
  expected: string
) {
  // Increment step counter
  stepCounter++;
  const screenshotId = `SC_${String(stepCounter).padStart(3, "0")}`;
  const screenshotPath = path.join(SCREENSHOT_DIR, `${screenshotId}.png`);

  // Take full Windows desktop screenshot
  try {
    const imgBuffer = await screenshot({ format: "png" });
    fs.writeFileSync(screenshotPath, imgBuffer);
    console.log(`[Desktop Screenshot] Saved: ${screenshotPath}`);
  } catch (err) {
    console.error("Screenshot failed:", err);
  }

  // Prepare CSV row with timestamp
  const timestamp = new Date().toISOString();
  const row = `"${step}","${description}","${expected}","${screenshotId}","${timestamp}"\n`;

  // Write header if CSV doesn't exist
  if (!fs.existsSync(CSV_PATH)) {
    fs.mkdirSync(path.dirname(CSV_PATH), { recursive: true });
    fs.writeFileSync(CSV_PATH, 'Step,Description,Expected,ScreenshotID,DateTime\n');
  }

  // Append row
  fs.appendFileSync(CSV_PATH, row);

  console.log(`STEP STORED: ${step} | ${screenshotId}`);
}
