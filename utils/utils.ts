import { Page } from "@playwright/test";
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  ImageRun,
  WidthType,
  BorderStyle,
  TextRun
} from "docx";
import * as fs from "fs";
import * as path from "path";
import screenshot from "screenshot-desktop";

interface StepEntry {
  step: string;
  description: string;
  expected: string;
  screenshotId: string;
}

interface ScreenshotEntry {
  id: string;
  buffer: Buffer;
}

class DocManager {
  private steps: StepEntry[] = [];
  private screenshots: ScreenshotEntry[] = [];
  private counter = 1;

  async createStep(page: Page, step: string, description: string, expected: string) {
    const screenshotId = `SC_${String(this.counter).padStart(3, "0")}`;
    this.counter++;

    const folder = path.join("test-output", "screenshots");
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    const screenshotPath = path.join(folder, `${screenshotId}.png`);

    // FULL SCREEN
    const img = await screenshot({ format: "png" });
    fs.writeFileSync(screenshotPath, img);

    const buffer = fs.readFileSync(screenshotPath);

    this.steps.push({
      step,
      description,
      expected,
      screenshotId,
    });

    this.screenshots.push({
      id: screenshotId,
      buffer,
    });
  }

  private buildSummaryDoc(): Document {
    return new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "TEST EXECUTION REPORT",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph(" "),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: [
                    this.headerCell("Step Name"),
                    this.headerCell("Description"),
                    this.headerCell("Expected"),
                    this.headerCell("Screenshot ID"),
                  ],
                }),

                ...this.steps.map((s) =>
                  new TableRow({
                    children: [
                      this.dataCell(s.step),
                      this.dataCell(s.description),
                      this.dataCell(s.expected),
                      this.dataCell(s.screenshotId),
                    ],
                  })
                ),
              ],
            }),
          ],
        },
      ],
    });
  }

  private headerCell(text: string): TableCell {
    return new TableCell({
      shading: { fill: "D9D9D9" },
      borders: this.allBorders(),
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text,
              bold: true,
            }),
          ],
        }),
      ],
    });
  }

  private dataCell(text: string): TableCell {
    return new TableCell({
      borders: this.allBorders(),
      children: [new Paragraph(text)],
    });
  }

  private allBorders() {
    return {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    };
  }

  private buildScreenshotDoc(): Document {
    return new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "SCREENSHOT LIBRARY",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph(" "),

            ...this.screenshots.flatMap((shot) => [
              new Paragraph({
                text: `Screenshot ID: ${shot.id}`,
                heading: HeadingLevel.HEADING_2,
              }),

              new Paragraph({
                children: [
                  new ImageRun({
                    data: shot.buffer,
                    type: "png", // FIXED
                    transformation: {
                      width: 600,
                      height: 350,
                    },
                  }),
                ],
              }),

              new Paragraph(" "),
            ]),
          ],
        },
      ],
    });
  }

  async saveDocuments() {
    if (!fs.existsSync("test-output"))
      fs.mkdirSync("test-output", { recursive: true });

    fs.writeFileSync(
      "test-output/Test_Report.docx",
      await Packer.toBuffer(this.buildSummaryDoc())
    );

    fs.writeFileSync(
      "test-output/Screenshot_Library.docx",
      await Packer.toBuffer(this.buildScreenshotDoc())
    );
  }
}

export const docManager = new DocManager();

export async function docCreate(
  page: Page,
  step: string,
  description: string,
  expected: string
) {
  await docManager.createStep(page, step, description, expected);
}
