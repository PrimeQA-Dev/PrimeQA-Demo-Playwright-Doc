import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const SENDER_EMAIL = "automationreport477@gmail.com";
const SENDER_PASSWORD = "luda tggu smax vgfx";
const RECEIVER_EMAIL = "primeqa.punya@gmail.com, sachin@primeqasolutions.com";

function prepareEmailBody(date_time_str: string): string {
  return `
    <html>
    <body style="font-family: Arial; font-size: 14px;">
      <h2>Test Execution Report</h2>
      <p><b>Date:</b> ${date_time_str}</p>
      <p>Attached files include the HTML report and additional Word documents.</p>
    </body>
    </html>
  `;
}

// MAIN EMAIL SEND
async function sendEmailNow() {
  const date_time_str = new Date().toLocaleString();

  const reportHtmlPath = path.join(__dirname, "../test-results/cucumber-report-smoke.html");
  const wordFile1 = path.join(__dirname, "../test-output/Automation_Step_Report.docx");
  const wordFile2 = path.join(__dirname, "../test-output/Automation_Screenshot_Report.docx");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD,
    },
  });

  const emailBody = prepareEmailBody(date_time_str);
  const attachments: any[] = [];

  // Attach HTML report
  if (fs.existsSync(reportHtmlPath)) {
    attachments.push({
      filename: "TestReport.html",
      content: fs.readFileSync(reportHtmlPath),
      contentType: "text/html",
    });
  }

  // Attach Word file 1
  if (fs.existsSync(wordFile1)) {
    attachments.push({
      filename: "Summary.docx",
      content: fs.readFileSync(wordFile1),
      contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
  }

  // Attach Word file 2
  if (fs.existsSync(wordFile2)) {
    attachments.push({
      filename: "Details.docx",
      content: fs.readFileSync(wordFile2),
      contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
  }

  // Email message
  const message = {
    from: SENDER_EMAIL,
    to: RECEIVER_EMAIL,
    subject: "Automation Test Execution Report",
    html: emailBody,
    attachments: attachments,
  };

  try {
    await transporter.sendMail(message);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

console.log("-Sending Mail......")
sendEmailNow();
