// Google Apps Script - Deploy as web app
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Paste this code
// 4. Deploy > New Deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the URL and paste it into src/config.ts

const SHEET_NAME = 'LMArena Onboarding Results';

function doGet(e) {
  const action = e.parameter.action;

  if (action === 'checkEmail') {
    const email = e.parameter.email;
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    const exists = data.some(row => row[0] === email);
    return ContentService.createTextOutput(JSON.stringify({ exists }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ error: 'Unknown action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    if (payload.action === 'submit') {
      const sheet = getOrCreateSheet();
      sheet.appendRow([
        payload.email,
        payload.passed ? 'PASS' : 'FAIL',
        payload.score,
        payload.totalQuestions,
        payload.elapsedSeconds,
        payload.timestamp,
        JSON.stringify(payload.answers),
      ]);
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Email', 'Result', 'Score', 'Total Questions', 'Elapsed Seconds', 'Timestamp', 'Answers']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
  }
  return sheet;
}
