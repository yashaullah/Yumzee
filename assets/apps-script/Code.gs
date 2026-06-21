/**
 * Yumzee — Google Sheets order receiver
 *
 * SETUP
 * 1) Go to https://script.google.com → New Project
 * 2) Replace Code.gs with this file's contents
 * 3) Run setup() once (top menu Run → setup). Approve permissions.
 *    This creates a sheet tab named "Orders" with a header row.
 * 4) Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy → copy the Web App URL
 * 5) Paste that URL into assets/js/config.js  (SHEETS_WEBAPP_URL)
 */

const SHEET_NAME = 'Orders';

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = setup();

  const data = JSON.parse(e.postData.contents);
  sh.appendRow([
    new Date(),
    data.order_no || '',
    data.name || '',
    data.phone || '',
    data.address || '',
    JSON.stringify(data.items || []),
    data.total || 0,
    data.notes || '',
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, order_no: data.order_no }))
    .setMimeType(ContentService.MimeType.JSON);
}

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Timestamp','Order No','Name','Phone','Address','Items (JSON)','Total','Notes']);
    sh.setFrozenRows(1);
  }
  return sh;
}
