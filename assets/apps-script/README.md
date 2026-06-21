# Google Sheets Integration — Yumzee Orders

1. Open https://sheets.google.com and create a new blank spreadsheet (name it "Yumzee Orders").
2. From that sheet, open **Extensions → Apps Script**.
3. Delete the default `Code.gs` content and paste the contents of **Code.gs** from this folder.
4. Hit **Run → setup** (top menu). Approve the requested permissions for your Google account.
   - This creates an "Orders" tab with column headers.
5. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the **Web App URL**.
6. Open `assets/js/config.js` and paste the URL into `SHEETS_WEBAPP_URL`.

That's it. Every order submitted from `checkout.html` will be appended to your sheet.

---

# Google Sheets Integration — Yumzee Content (Categories, Items, Team, News, Gallery, Deals)

This is a **separate** spreadsheet and a **separate** Apps Script deployment
from the Orders one above. It's what makes everything you manage in
`admin.html` — Categories, Food Items, Team/Chefs, News announcements,
Gallery photos, and Deals/Offers — show up on **every device**, not just
the one you added it from. Images go to **Google Drive**, the rest of the
data goes to **Google Sheets**.

## Setup (do this once)

1. Open https://sheets.google.com and create a new blank spreadsheet
   (name it "Yumzee Content").
2. **Extensions → Apps Script**. Delete the default code, paste the entire
   contents of **Code-Content.gs** from this folder.
3. Run → **setup** (top menu, you may need to click the function dropdown
   and pick `setup` first). Approve permissions when asked (click through
   "Advanced" → "Go to project (unsafe)" — this warning is normal for your
   own scripts).
   - This creates **6 tabs**: "Categories", "Items", "Team", "News",
     "Gallery", "Deals" — each with the right header row already filled in.
   - It also creates a Google Drive folder named **"Yumzee Images"** where
     every photo uploaded from `admin.html` will be stored.
4. **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** → copy the **Web App URL**.
5. Open `assets/js/config.js` and paste that URL into `CONTENT_WEBAPP_URL`.
   (This is a *different* URL from `SHEETS_WEBAPP_URL` — that one stays as-is
   for orders. You will have **two** different Apps Script URLs sitting in
   `config.js`, one for orders, one for content. Both are needed.)

That's the whole setup — five minutes, same pattern as the Orders sheet you
already did.

## What works automatically after that

- Adding, editing, or deleting a **Category**, **Food Item**, **Team
  member**, **News announcement**, **Gallery photo**, or **Deal/Offer** in
  `admin.html` saves to this Sheet, on top of saving locally for instant
  feedback in the browser you're using.
- Any photo uploaded through the **Food Items**, **Team**, or **Gallery**
  forms is uploaded straight to the "Yumzee Images" Drive folder, and its
  link is saved in the Sheet automatically — you never touch GitHub or
  re-deploy the site to add a dish, a chef photo, or a gallery picture.
- Every page (`index.html`, `menu.html`, `admin.html`) pulls the latest data
  from this Sheet the moment it loads, so something added from a phone shows
  up on a laptop within seconds, and vice versa.

## If something added on one device still isn't showing on another

This almost always means **step 5 above wasn't done yet** — the website
keeps working fine either way (each device just keeps its own local copy,
exactly like before this feature existed), it simply won't sync between
devices until `CONTENT_WEBAPP_URL` has a real deployed URL in it instead of
the placeholder text. Open `assets/js/config.js` and check that line.

## Notes

- **If `CONTENT_WEBAPP_URL` is left as the placeholder**, the site falls
  back to working exactly as before (each device keeps its own local data)
  — nothing breaks, you just won't get cross-device sync until you deploy
  this script and paste the URL in.
- **Offline / slow internet**: the last-synced data is always shown
  immediately from a local cache, then refreshed in the background once the
  Sheet responds — visitors never see a blank page while waiting.
- **Image links**: uploaded photos use a Google Drive direct-view link
  format. If a photo ever stops showing up after a Google-side change, open
  the file in the "Yumzee Images" Drive folder, click **Share → General
  access → Anyone with the link**, and confirm sharing is still on for that
  file.
- **Two Apps Script URLs, two Sheets, on purpose**: Orders go to one
  spreadsheet, everything else (Categories/Items/Team/News/Gallery/Deals) goes to
  a separate one. This keeps order data (customer names, phone numbers,
  addresses) cleanly apart from site content.

